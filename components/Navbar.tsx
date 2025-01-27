'use client'
import { cn } from '@/utils/cn';
import { createClient } from '@/utils/supabase/client';
import { allowedEmails } from '@/utils/utils';
import { User } from '@supabase/supabase-js';
import localFont from 'next/font/local';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import "../app/globals.css";
import { Button, buttonVariants } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ModeToggle } from '@/components/ui/modeToogle'
import { useTheme } from 'next-themes'

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
    const {theme} = useTheme()

    useEffect(() => {
        const categoriesList = async () => {
            const supabase = createClient()
            const { data } = await supabase.auth.getUser()
            setUser(data.user)
            const { data: categories } = await supabase.from("category").select()
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
      <div className={`flex justify-center ${theme === 'dark' && "bg-black"}`}>
            <nav className={`z-50 flex mx-auto rounded-lg shadow-md p-2 px-4 justify-between w-1/2 ${theme === 'dark' && "border border-gray-600 mt-1"}`}
            >
                <div className="flex gap-1 mt-1">
                    {/* <Stethoscope className="mt-1" /> */}
                    <h2 className={`font-semibold text-lg cursor-pointer ${AerialFont.className}  ${theme === 'dark' && "text-white"}`} onClick={() => router.push("/")}>PhysioMedix</h2>
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
                                className={cn(`cursor-pointer text-left font-semibold pr-2 lg:block ${AerialFont.className} ${theme === 'dark' && "text-white"}`, {
                                    "sm:flex": !user,
                                    "sm:hidden": user
                                })}>Categories</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-0">
                            <div className="grid grid-cols-2 gap-2 p-2">
                                {categories?.map((category, index) => (
                                    <DropdownMenuItem
                                        key={index}>
                                        <h2 className={`text-sm font-normal hover:cursor-pointer ${theme === 'dark' && "text-white"}`} onClick={() => handleClick(category.name, category.id)}>
                                            {category.name}
                                        </h2>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {user && allowedEmails.includes(user.email!) && (
                        <Link
                            className={`hover:cursor-pointer ${buttonVariants({ variant: "outline" })} ${AerialFont.className} ${theme === 'dark' && "text-white"}`}
                            href={"/admin"}
                        >
                            Dashboard
                        </Link>
                    )}
                    {!user && (
                      <Link href={`/sign-in `} className={`${buttonVariants({ variant: "lightBlue" })}`}>
                          Sign in
                      </Link>
                    )}
                     <ModeToggle />
                </div>
            </nav >
      </div>
    )
}

export default Navbar