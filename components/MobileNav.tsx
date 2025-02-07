'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { ModeToggle } from '@/components/ui/modeToogle'
import CategoryBox from '@/components/CategoryBox'


// interface catogeryProps {
//   id: number;
//   name: string;
//   description: string
// }

const AerialFont = localFont({
  src: "../app/fonts/AeonikProTRIAL-Bold.woff",
  weight: "400",
  style: "normal"
})


const MobileNav = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open,  setIsOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)


  const themeMain = theme === 'dark' && "bg-black"
  const themeNav = theme === 'dark' && "border border-gray-600 mt-1"
  const themeH2 = theme === 'dark' && "text-white"

  useEffect(() => {
    setMounted(true)

    const getUser = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()
  }, [user])


  if (!mounted) {
    return null
  }


  return (
    <div className={`flex lg:hidden justify-center ${themeMain}`}>
      <nav className={`flex z-50 justify-between mx-auto w-full rounded-lg shadow-md p-2 px-4 ${themeNav}`}>
        {/* title */}
        <div className="flex mt-1 mr-28">
          <h2 className={`font-semibold text-lg cursor-pointer ${AerialFont.className}  ${themeH2}`}
              onClick={() => router.push("/")}>PhysioMedix</h2>
        </div>

        {/* menu */}
        <div className={"flex justify-end"}>
          <DropdownMenu open={open}  onOpenChange={setIsOpen}>
            <DropdownMenuTrigger onMouseEnter={() => setIsOpen(true)} className={'outline-none  cursor-pointer'}>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side={"bottom"}
              align={"end"}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className={`${!open && "hidden"} ${AerialFont.className}`}
            >
              <div className={"flex flex-col space-y-3 p-3"}>
                <CategoryBox />
                {user ?
                  <Link href={"/admin"} className={`${themeH2}`}>Dashboard</Link>
                  :
                  <Link href={"/sign-in"} >Sign in</Link>
                }
                <ModeToggle />
              </div>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </nav>
    </div>
  )
}
export default MobileNav
