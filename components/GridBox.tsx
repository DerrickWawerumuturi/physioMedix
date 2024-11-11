'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Skeleton } from './ui/skeleton'

export const PostPlaceHolder = () => {
    return (
        <div className='mt-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:mx-14 lg:mx-36'>
            <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                <Skeleton className='h-full w-full' />
            </div>
            <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                <Skeleton className='h-full w-full' />
            </div>
            <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                <Skeleton className='h-full w-full' />
            </div>
        </div>
    )
}



const GridBox = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [covers, setCovers] = useState<{ [key: number]: string }>({});
    const [postCategories, setPostCategories] = useState<{ [key: number]: string[] }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        const posts = async () => {
            setLoading(true);

            try {
                const { data } = await supabase.from("posts").select();
                const posts = data as PostProps[];
                setPosts(posts);

                // Fetch cover images
                const coverIds = posts.map(post => post.cover_id);
                const { data: coverData } = await supabase
                    .from('media')
                    .select('id, filename')
                    .in('id', coverIds);

                // Create a mapping of cover ID to filename
                const coverMap = (coverData || []).reduce((map, item) => {
                    const { data } = supabase
                        .storage
                        .from('media')
                        .getPublicUrl(item.filename); // Generate the public URL
                    console.log('Public urls:', data.publicUrl)
                    map[item.id] = data.publicUrl; // Store the URL in the map
                    return map;
                }, {} as { [key: number]: string });

                setCovers(coverMap);

                // Fetch the categories related to the posts
                const { data: categoryRelations, error } = await supabase
                    .from("posts_rels")
                    .select("category_id, parent_id")
                    .in("parent_id", posts.map(post => post.id));

                if (error) {
                    console.error("Error fetching category relations:", error);
                } else {
                    console.log("Category Relations:", categoryRelations);

                    // Extract unique category IDs
                    const categoryIds = categoryRelations.map(relation => relation.category_id);

                    // Fetch category names based on the IDs
                    const { data: categories, error: categoryError } = await supabase
                        .from("category")
                        .select("id, name")
                        .in("id", categoryIds);

                    if (categoryError) {
                        console.error("Error fetching categories:", categoryError);
                    } else {
                        console.log("Categories:", categories);

                        // Create a mapping of post IDs to their categories
                        const categoriesMap: { [key: number]: string[] } = {};
                        categoryRelations.forEach(relation => {
                            const category = categories.find(cat => cat.id === relation.category_id)?.name;
                            if (category) {
                                if (!categoriesMap[relation.parent_id]) {
                                    categoriesMap[relation.parent_id] = [];
                                }
                                categoriesMap[relation.parent_id].push(category);
                            }
                        });
                        setPostCategories(categoriesMap); // Store the mapping in state
                    }
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        posts();
    }, []);

    if (loading) {
        return <PostPlaceHolder />; // Show the placeholder while loading
    }

    return (
        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:max-w-3xl lg:max-w-7xl lg:max-width md:pl-5 lg:pl-0'>
            {posts.map((post, index) => (
                <Card
                    key={index}
                    id={post.id}
                    title={post.title}
                    subtitle={post.subtitle}
                    cover={covers[post.cover_id]}
                    date={post.updated_at}
                    type={post.type!}
                    categories={postCategories[post.id] || []} // Add categories as needed
                />
            ))}
        </div>
    );
};

export default GridBox;
