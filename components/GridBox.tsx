'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Skeleton } from './ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import { ImSpinner2 } from 'react-icons/im'

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
    const [hasMore, setHasMore] = useState(true) // checks whether there are more posts to fetch
    const [offset, setOffset] = useState(0) // keeps track of the offset
    const [showNoMore, setShowNoMore] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    const LIMIT = 6 // number of posts nitafetch each time


    const loadPosts = async (offset: number) => {
        try {
            setLoading(true)

            const supabase = createClient()
            const {data, error} =  await supabase
              .from("posts")
              .select("*")
              .range(offset, offset + LIMIT - 1)

            if (error) {
                console.log("Error fetching more posts", error)
                return
            }


            if (data) {
                if (data.length < LIMIT) {
                    setHasMore(false)
                    setShowNoMore(true)
                }

                setPosts(prevPosts => {
                    const newPosts = data  as PostProps[]

                    // prevent repeatition of the already fetched posts
                    const existingPostsIds = new Set(prevPosts.map(post => post.id))
                    const filteredPosts = newPosts.filter(post => !existingPostsIds.has(post.id))

                    return [...prevPosts, ...filteredPosts]
                })

                const coverIds = data.map(post => post.cover_id);
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
                    map[item.id] = data.publicUrl; // Store the URL in the map
                    return map;
                }, {} as { [key: number]: string });

                setCovers(prevCovers => ({...prevCovers, ...coverMap}));

                // Fetch categories related to the posts
                const { data: categoryRelations, error: categoryError } = await supabase
                  .from('posts_rels')
                  .select('category_id, parent_id')
                  .in('parent_id', data.map(post => post.id));

                if (categoryError) {
                    console.error('Error fetching category relations:', categoryError);
                } else {
                    const categoryIds = categoryRelations.map(relation => relation.category_id);
                    const { data: categories, error: categoryFetchError } = await supabase
                      .from('category')
                      .select('id, name')
                      .in('id', categoryIds);

                    if (categoryFetchError) {
                        console.error('Error fetching categories:', categoryFetchError);
                    } else {
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

        }
        } catch (error) {
            console.log("Error loading posts", error)
        } finally {
            setLoading(false)
        }
    }

    // fetch initial posts
    useEffect(() => {
        loadPosts(offset)
    }, [offset]);

    useEffect(() => {
        if (showNoMore) {
            setTimeout(() => {
                setFadeOut(true)
            }, 2000)
        }
    }, [showNoMore])

    // load more posts when the button is clicked
    const handleLoadMore = () => {
        if (hasMore) {
            setOffset(prevOffset => prevOffset + LIMIT)
        }
    }


    if (loading && posts.length === 0) {
        return <PostPlaceHolder />; // Show the placeholder while loading
    }

    return (
      <div className={"flex flex-col space-y-11"}>
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
          {hasMore ? (
            <div className={"flex justify-center mt-20"}>
                <Button
                    onClick={handleLoadMore}
                className={"flex space-x-3"}
                >
                    <ArrowDown />
                    {loading ? <ImSpinner2 className={"animate-spin"} />: 'Load More'}
                </Button>
            </div>
          ): (
            <div className={"flex justify-center mt-20"}>
                <Button
                  className={`flex justify-center transition-opacity duration-1000 ${fadeOut ? "opacity-0": "opacity-100"}`}
                >
                    <p>No more Posts</p>
                </Button>
            </div>
          )}

      </div>
    );
};

export default GridBox;
