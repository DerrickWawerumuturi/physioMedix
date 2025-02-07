'use client'
import React, { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { useTheme } from 'next-themes'
import { createClient } from '@/utils/supabase/client'
import localFont from 'next/font/local'

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



const CategoryBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<catogeryProps[]>([])
  const [user, setUser] = useState<User | null>(null)
  const {theme} = useTheme()
  const router = useRouter();
  const [mounted, setMounted] = useState(false)
  const themeH2 = theme === 'dark' && "text-white"


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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleClick = (categoryName: string, categoryId: number) => {
    setIsOpen(false);
    router.push(`/category/${categoryName}?id=${categoryId}`)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={`outline-none cursor-pointer text-left font-semibold lg:block ${AerialFont.className} ${themeH2}`}
      >
          Categories
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={"top"}
        align={"end"}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`min-w-0 ${!open && "hidden"}`}>
        <div className="grid grid-cols-2 gap-2 p-2">
          {categories?.map((category, index) => (
            <DropdownMenuItem
              key={index}>
              <h2 className={`text-sm font-normal hover:cursor-pointer ${themeH2}`} onClick={() => handleClick(category.name, category.id)}>
                {category.name}
              </h2>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default CategoryBox
