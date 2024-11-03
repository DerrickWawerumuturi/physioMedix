'use client'
import { createClient } from '@/utils/supabase/client'
import React from 'react'
import GoogleButton from 'react-google-button'
import "../globals.css"


const Page = () => {
    const handleSignIn = async () => {
        const supabase = createClient()
        const { data } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "/"
            }
        })

    }


    return (
        <div className='min-h-screen flex items-center justify-center align-center flex-col gap-4'>
            <div className='flex space-x-3'>
                <GoogleButton onClick={handleSignIn} />
            </div>
        </div>
    )
}

export default Page