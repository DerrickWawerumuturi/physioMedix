'use client'
import Card from '@/components/Card'
import Navbar from '@/components/Navbar'
import { cn } from '@/utils/cn'
import Serialize from '@/utils/Editor'
import { createClient } from '@/utils/supabase/client'
import { convertToOriginalTitle, formatDate } from '@/utils/utils'
import { ArrowBigLeft, ArrowLeft, Clock } from 'lucide-react'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import "../../globals.css"
const AerialFont = localFont({
    src: "../../fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const LatoBold = localFont({
    src: "../../fonts/Lato-Bold.ttf",
    weight: "400",
    style: "normal"
})

const LatoRegular = localFont({
    src: "../../fonts/Lato-Regular.ttf",
    weight: "200",
    style: "normal"
})

const SUPABASE_URL = 'https://eejowrrhyyummrlskjln.supabase.co'


const Page = () => {
    const { title } = useParams()
    const [content, setContent] = useState<any>([])
    const originalTitle = decodeURIComponent(convertToOriginalTitle(title as string))
    const [posts, setPosts] = useState<PostProps[]>([])
    const [covers, setCovers] = useState<{ [key: number]: string }>({});
    const [postCategories, setPostCategories] = useState<{ [key: number]: string[] }>({});
    const [imageUrl, setImageUrl] = useState<string>()
    const [updatedAt, setUpdatedAt] = useState<string>()

    useEffect(() => {
        const fetchContent = async () => {
            const supabase = createClient()
            const { data: contentArray } = await supabase.from("posts").select("content").eq("title", originalTitle)
            if (contentArray && contentArray[0].content !== null && contentArray.length > 0) {
                setContent(contentArray[0].content.root.children)
            }
            const { data: cover_id } = await supabase.from("posts").select("cover_id").eq("title", originalTitle)
            if (cover_id && cover_id.length > 0) {
                const { data: image } = await supabase.from("media").select("filename").eq("id", cover_id[0].cover_id)
                if (image) {
                    const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/media/${image[0].filename}`
                    setImageUrl(imageUrl)
                } else {
                    console.log('no filename')
                }
            } else {
                console.log("no coverid")
            }

            const { data: updatedAT } = await supabase.from("posts").select("updated_at").eq("title", originalTitle)
            if (updatedAT && updatedAT.length > 0) {
                const updated_at = updatedAT[0].updated_at
                setUpdatedAt(updated_at)
            }
        }

        fetchContent()
    }, [originalTitle, content])

    useEffect(() => {
        const supabase = createClient()
        const posts = async () => {
            const { data } = await supabase.from("posts").select("*").limit(3)
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
                const { data } = supabase
                    .storage
                    .from('media')
                    .getPublicUrl(item.filename); // Generate the public URL
                map[item.id] = data.publicUrl; // Store the URL in the map
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
        <div className='flex flex-col min-h-screen bg-blue-50'>
            <div className='mb-5'>
                <Navbar />
            </div>

            <div className={cn('flex flex-col sm:mx-4 lg:mx-44  mb-20 space-y-14')}>
                <div className={`flex flex-row  bg-gray-950 rounded-xl h-[400px]  text-white`}>
                    <div className={`flex flex-col space-y-11 lg:w-1/2 p-7 ml-7 ${LatoBold.className}`}>
                        <Link href="/" className='flex space-x-2 mt-6 hover:underline max-w-sm'>
                            <ArrowLeft className='h-6 w-6 mt-0.5' />
                            <h2 className={`text-xl ${LatoBold.className}`}>Back to lobby</h2>
                        </Link>
                        <h2 className={`font-bold text-6xl sm:max-w-md lg:max-w-7xl ${LatoBold.className}`}>{originalTitle}</h2>
                        <div className='flex space-x-3 lg:pt-16'>
                            <Clock className='h-6 w-6' />
                            <p className='lg:text-lg'>5 min read.</p>
                            {updatedAt && updatedAt.length > 0 && (
                                <p className='pl-5 lg:text-lg'>{formatDate(updatedAt)}</p>
                            )}
                            {/* writer */}
                        </div>
                    </div>

                    <div className="sm:hidden lg:flex lg:w-1/2 h-full relative">
                        {imageUrl && imageUrl?.length > 0 && (
                            <Image
                                src={imageUrl}
                                alt='post image'
                                layout='fill'
                                objectFit='cover'
                                className='rounded-r-xl'

                            />
                        )}
                    </div>
                </div>

                <div className={`flex flex-col gap-5 bg-white rounded-xl max-w-5xl ${LatoRegular.className} p-14`}>
                    <h2 className='font-bold text-5xl mb-6'>{originalTitle}</h2>
                    <div className='text-2xl'>
                        <Serialize>{content}</Serialize>
                    </div>
                </div>
            </div>
            <Link href="/" className={`${LatoBold.className} flex space-x-2 sm:ml-20 lg:ml-36 mb-11`}>
                <ArrowBigLeft />
                <p className='text-2xl'>Back</p>
            </Link>

            <h2 className={`ml-20 lg:ml-36 font-bold text-6xl ${LatoBold.className}`}>Maybe you&apos;d be interested in this too</h2>
            <div className={`fade-in fade-in-visible my-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:max-w-3xl lg:max-w-7xl lg:max-width md:pl-5 lg:pl-0 sm:mx-14 lg:mx-36 ${LatoRegular.className}`}>
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
        </div>
    )
}

export default Page