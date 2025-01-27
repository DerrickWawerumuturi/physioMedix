'use client'
import { createClient } from '@/utils/supabase/client'
import '../../globals.css'
import localFont from 'next/font/local'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaSpotify } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ImSpinner2 } from 'react-icons/im'
import { useTheme } from 'next-themes'


const AerialFont = localFont({
    src: "../../fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})


const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()


  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }

  }, [])


  // email
  const handleEmailSignIn = async () => {
    try {
      setIsLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        toast.error("Oops! Something wrong happened")
      } else {

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email)
        } else {
          localStorage.removeItem("rememberedEmail")
        }
        router.push("/")
      }
    } catch (error) {
      console.log("Error signing in with Email", error)
    } finally {
      setIsLoading(false)
    }

  }

  // google
  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/"
      }
    })
  }

  // spotify
  const handleSpotifySignIn = async () => {
    try {
      setIsLoading(true)
      const supabase = createClient()
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          redirectTo: "/"
        }
      })
    } catch (error) {
      console.log("error signing in with Spotify", error)
    } finally {
      setIsLoading(false)
    }
  }

  // twitter
  const handleTwitterSignIn = async () => {
    try {
      setIsLoading(true)
      const supabase = createClient()
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: "/"
        }
      })
    } catch (error) {
      console.log("Error signing in with Twitter", error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className={`min-h-screen overflow-hidden flex items-center justify-center align-center flex-col gap-4 -mt-16 ${AerialFont.className} ${theme === 'dark' && 'bg-black'}`}>
      {/* sign up information*/}
      <div className={"flex flex-col space-y-5 mt-28"}>
        <h2 className={"text-4xl tracking-tight font-bold text-green-600 text-center"}>Sign into your Account</h2>
        <div className={'flex space-x-5 mt-3 justify-center'}>

          <div
            className={`border-2 border-gray-200 rounded-lg p-2 flex items-center justify-center hover:cursor-pointer ${theme === 'dark' && "border-2 border-gray-600"}`}
            onClick={handleGoogleSignIn}>
            <FcGoogle size={34} />
          </div>

          <div
            className={`border-2 border-gray-200 rounded-lg p-2 flex items-center justify-center hover:cursor-pointer ${theme === 'dark' && "border-2 border-gray-600"}`}
            onClick={handleSpotifySignIn}>
            <FaSpotify color={'green'} size={34} />
          </div>

          <div
            className={`border-2 border-gray-200 rounded-lg p-2 flex items-center justify-center hover:cursor-pointer ${theme === 'dark' && "border-2 border-gray-600"}`}
            onClick={handleTwitterSignIn}>
            <FaSquareXTwitter size={34} />
          </div>

        </div>

        <p className={'mt-2 text-gray-400  text-center text-md'}> or use your email account </p>
        <div className={'flex flex-col space-y-2 pt-5 sm:justify-center sm:items-center lg:justify-normal '}>
          <Input
            placeholder={'Email'}
            type={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size={80}
            className={"mb-5 text-md sm:w-3/4 md:w-1/2  "}
          />

          <Input
            placeholder={'Password'}
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size={80}
            className={"text-md w-full sm:w-3/4 md:w-1/2  "}
          />

          <div className={'flex py-3 justify-between'}>
            <p>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  setRememberMe(target.checked)
                }}
              />
              <span className={`text-sm ml-1 ${theme === 'dark' && "text-white"}`}>Remember me</span></p>

            {/* fix the reset password later*/}
            {/*<Link href={'/reset-password'} className={'text-sm mt-0.5 hover:underline'}>Forgot Password?</Link>*/}
          </div>

          <Button
            onClick={handleEmailSignIn}
            variant={"green"}
            className={"text-lg"}
          >
            {isLoading ? <ImSpinner2 className={"animate-spin"} /> : "Sign in"}
          </Button>
        </div>

        <div className={'flex justify-center space-x-1 text-md '}>
          <p className={`text-gray-600 ${theme === 'dark' && "text-white"}`}>New to PhysioMedix?</p>
          <Link href={"/sign-up"} className={"text-red-400 underline"}>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Page