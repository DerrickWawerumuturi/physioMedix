'use client'
import Card from '@/components/Card'
import { createClient } from '@/utils/supabase/client'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import "../../globals.css"
import { ChevronRight, House } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
    const searchParams = useSearchParams()
    const { categoryName } = useParams()
    const category = (categoryName as string).replace(/%/g, '').replace(/E28099/g, '’').replace(/20/g, ' ');
    const id = searchParams.get('id')
    const [covers, setCovers] = useState<{ [key: number]: string }>({});
    const [posts, setPosts] = useState<PostProps[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const supabase = createClient()
            if (id) {
                const { data: parentIds, error: relError } = await supabase
                    .from("posts_rels")
                    .select("parent_id")
                    .in("category_id", [id])

                if (relError) {
                    console.error("Error fetching parent IDs:", relError)
                    return
                }

                if (parentIds && parentIds.length > 0) {
                    // Extract parent IDs into an array
                    const parentIdArray = parentIds.map(item => item.parent_id)

                    // Fetch all posts with the parent IDs
                    const { data: postsData, error: postsError } = await supabase
                        .from("posts")
                        .select("*")
                        .in("id", parentIdArray)

                    if (postsError) {
                        console.error("Error fetching posts:", postsError)
                    } else {
                        setPosts(postsData || [])
                    }
                }
            } else {
                console.warn("No ID provided")
            }

            if (posts) {
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
            }

        }
        fetchPosts()
    }, [id, posts])


    return (
        <div className='flex flex-col gap-6 justify-center align-middle bg-gradient-to-t from-indigo-100 min-h-screen'>

            <div className='flex space-x-3 sm:ml-16 lg:ml-10 lg:-mt-28'>
                <Link href={"/"} className='flex hover:underline transform transition duration-300 hover:scale-110'>
                    <House />
                </Link>
                <ChevronRight />
                <h2 className={`text-5xl font-semibold -mt-2 hover:underline hover:cursor-pointer`}>{category}</h2>
            </div>
            <div className='sm:ml-20 mt-10 grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10 sm:max-w-3xl lg:max-w-7xl lg:max-width md:pl-5 lg:pl-0 md:pr-5 lg:pr-0 lg:ml-7 '>
                {posts && posts.map((post, index) => (
                    <Card
                        key={index}
                        id={post.id}
                        title={post.title}
                        subtitle={post.subtitle}
                        cover={covers[post.cover_id]}
                        date={post.updated_at}
                        categories={[category]}
                        type={post.type!}
                    />
                ))}
            </div>
        </div>
    )
}

export default Page