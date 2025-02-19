'use client'
import Image from 'next/image'
import { Button } from './ui/button'
import { formatDate } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'


const AerialFont = localFont({
    src: "../app/fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

interface CardProps {
    id: number,
    title: string,
    subtitle: string,
    date: string,
    cover: string
    type: string
    categories: string[]
}

const Card = ({
    id,
    title,
    date,
    cover,
    categories
}: CardProps) => {
    const router = useRouter()
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    const themeBorder = theme === "dark"  && "bg-black border border-gray-600"

    const onClick = () => {
        const formattedTitle = title.replace(/\s+/g, '-');
        router.push(`/post/${formattedTitle}?id=${id}`)
    }


    return (
        <div
            className={`rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer sm:max-w-sm lg:max-w-10xl ${themeBorder}`}
            onClick={onClick}
        >
            <div className='relative h-48 w-full'>
                {typeof cover === "string" && (
                    <Image
                        src={`${cover}`}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="h-full w-full"
                    />
                )}
            </div>
            <div className="flex p-4 items-start justify-between gap-3">
                {categories && categories.map((category, index) => (
                    <Button variant={"lightBlue"} key={index}>
                        {category}
                    </Button>
                ))}

                <p className="text-gray-600 mt-1 text-md font-semibold" suppressHydrationWarning>{formatDate(date)}</p>
            </div>
            <h2 className={`text-xl font-bold text-left p-4 ${AerialFont.className} ${theme === 'dark' && "text-white" }`}>{title}</h2>
        </div>
    )
}

export default Card