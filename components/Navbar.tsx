'use client'
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { cn } from '@/utils/cn';
import { allowedEmails } from '@/utils/utils';
import localFont from 'next/font/local';

interface catogeryProps {
    id: number;
    name: string;
    description: string
}
const AerialFont = localFont({
    src: "../app/fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<catogeryProps[]>([])
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const categoriesList = async () => {
            const supabase = createClient()
            const { data } = await supabase.auth.getUser()
            setUser(data.user)
            const { data: categories } = await supabase.from("category").select()
            console.log("catgeories are", categories)
            if (categories && categories.length > 0) {
                setCategories(categories)
            }
        }
        categoriesList()
    }, [])

    const handleClick = (categoryName: string, categoryId: number) => {
        setIsOpen(false);
        router.push(`/category/${categoryName}?id=${categoryId}`)
    }

    return (
        <div className="flex justify-center z-50 bg-white top-0"
        >
            <nav className="flex rounded-lg shadow-md p-2 px-4 justify-between w-1/2"
            >
                <div className="flex gap-1 mt-1">
                    {/* <Stethoscope className="mt-1" /> */}
                    <h2 className={`font-semibold text-lg cursor-pointer ${AerialFont.className}`} onClick={() => router.push("/")}>PhysioMedix</h2>
                </div>
                <div className="flex gap-2 justify-end">
                    {/* Categories bar */}
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger
                            className="outline-none pr-2 cursor-pointer"
                            asChild
                        >
                            <Button
                                variant={"ghost"}
                                className={cn(`cursor-pointer text-left font-semibold pr-2 lg:block ${AerialFont.className}`, {
                                    "sm:flex": !user,
                                    "sm:hidden": user
                                })}>Categories</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-0">
                            <div className="grid grid-cols-2 gap-2 p-2">
                                {categories?.map((category, index) => (
                                    <DropdownMenuItem
                                        key={index}>
                                        <h2 className="text-sm font-normal hover:cursor-pointer" onClick={() => handleClick(category.name, category.id)}>
                                            {category.name}
                                        </h2>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {user && allowedEmails.includes(user.email!) && (
                        <Link
                            className={`hover:cursor-pointer ${buttonVariants({ variant: "outline" })} ${AerialFont.className}`}
                            href={"/admin"}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </nav >
        </div >
    )
}

export default Navbar