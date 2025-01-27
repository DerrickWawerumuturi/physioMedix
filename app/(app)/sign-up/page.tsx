'use client'

import React, { useState } from 'react'
import localFont from 'next/font/local'
import AuthForm from '@/components/AuthForm'
import '../../globals.css'
import { createClient } from '@/utils/supabase/client'
import { FcGoogle } from 'react-icons/fc'
import { FaSpotify } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { useTheme } from 'next-themes'

const AerialFont = localFont({
    src: "../../fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const Page = () => {
  const { theme } = useTheme()

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
      const supabase = createClient()
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          redirectTo: "/"
        }
      })
    } catch (error) {
      console.log("error signing in with Spotify", error)
    }
  }

  // twitter
  const handleTwitterSignIn = async () => {
  try {
    const supabase = createClient()
    const { data } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: "/"
      }
    })
  } catch (error) {
    console.log("Error signing in with Twitter", error)
  }
}

  return (
    <div
      className={`min-h-screen flex items-center justify-center align-center flex-col gap-4 -mt-16 ${AerialFont.className} ${theme === 'dark' && 'bg-black'}`}>
      <h1 className={`text-4xl text-green-600 font-bold text-center ${AerialFont.className}`}>Welcome to
        Physiomedix</h1>
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
      <p className={'my-4 text-gray-400  text-center text-md'}> or use your email account </p>
      <div className='flex space-x-3 justify-center max-w-[496px]'>
        <AuthForm />
      </div>
    </div>
  )
}

export default Page