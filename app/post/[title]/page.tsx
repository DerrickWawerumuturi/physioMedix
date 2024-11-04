'use client'
import Card from '@/components/Card'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import Serialize from '@/utils/Editor'
import { createClient } from '@/utils/supabase/client'
import { convertToOriginalTitle } from '@/utils/utils'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import localFont from 'next/font/local'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import "../../globals.css"


const AerialFont = localFont({
    src: "../../fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const Page = () => {
    const { title } = useParams()
    const [content, setContent] = useState<any>([])
    const originalTitle = convertToOriginalTitle(title as string)
    const [posts, setPosts] = useState<PostProps[]>([])
    const [covers, setCovers] = useState<{ [key: number]: string }>({});
    const [postCategories, setPostCategories] = useState<{ [key: number]: string[] }>({});

    useEffect(() => {
        const fetchContent = async () => {
            const supabase = createClient()
            const { data: contentArray } = await supabase.from("posts").select("content").eq("title", originalTitle)
            if (contentArray && contentArray.length > 0) {
                setContent(contentArray[0].content.root.children)
            }
        }
        fetchContent()
    }, [originalTitle, content])

    useEffect(() => {
        const supabase = createClient()
        const posts = async () => {
            const { data } = await supabase.from("posts").select("*").range(0, 3)
            const posts = data as PostProps[]
            setPosts(posts)

            // Fetch cover images
            const coverIds = posts.map(post => post.cover_id);
            const { data: coverData } = await supabase
                .from('media')
                .select('id, filename')
                .in('id', coverIds);

            // Create a mapping of cover ID to filename
            const coverMap = (coverData || []).reduce((map, item) => {
                map[item.id] = item.filename;
                return map;
            }, {} as { [key: number]: string });

            setCovers(coverMap);


            // Fetch the categories related to the posts
            const { data: categoryRelations, error } = await supabase
                .from("posts_rels")
                .select("category_id, parent_id")
                .in("parent_id", posts.map(post => post.id)); // Get all category relations for these posts

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

        }
        posts()
    }, [])

    return (
        <>
            <div className={cn('flex sm:mx-4 lg:mx-44 space-x-5 lg:space-x-36 my-20', AerialFont.className)}>
                <div className='sm:hidden lg:flex'>
                    <Button variant={"outline"} className="p-5" asChild size={"lg"}>
                        <div className='flex space-x-2 text-gray-600 text-lg'>
                            {posts.length > 0 && postCategories[posts[0].id] && Array.isArray(postCategories[posts[0].id]) && postCategories[posts[0].id].length > 0 ? (
                                <>
                                    <h2>{posts[0].type}</h2>
                                    <ChevronRightIcon className='mt-1.5' />
                                    <p>{postCategories[posts[0].id][0]}</p> {/* Display the first category */}
                                </>
                            ) : (
                                <p>No categories available</p>
                            )}
                        </div>
                    </Button>
                </div>
                <div className='flex flex-col gap-5'>
                    <h2 className='font-bold text-3xl mb-16'>{originalTitle}</h2>
                    <div className='text-lg text-gray-600 font-thin'>
                        <Serialize>{content}</Serialize>
                    </div>
                </div>
            </div>
            <h2 className='ml-32 font-bold text-7xl'> Recent Posts</h2>
            <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:max-w-3xl lg:max-w-7xl lg:max-width md:pl-5 lg:pl-0 sm:mx-14 lg:mx-36'>
                {posts && posts.map((post, index) => (
                    <Card
                        key={index}
                        id={post.id}
                        title={post.title}
                        subtitle={post.subtitle}
                        cover={covers[post.cover_id]}
                        date={post.updated_at}
                        categories={postCategories[post.id]}
                        type={post.type!}
                    />
                ))}
            </div>
        </>
    )
}

export default Page