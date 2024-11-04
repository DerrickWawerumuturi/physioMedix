'use client'
import { createClient } from '@/utils/supabase/client'
import GoogleButton from 'react-google-button'
import "../globals.css"
import localFont from 'next/font/local'


const AerialFont = localFont({
    src: "../fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})


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
        <div className='min-h-screen flex items-center justify-center align-center flex-col gap-4 -mt-16'>
            <h1 className='text-4xl font-bold text-center'>Welcome to Physiomedix</h1>
            <p className={`text-lg text-gray-700 text-center max-w-2xl font-semibold ${AerialFont.className}`}>
                Experience the future of physiotherapy with Physiomedix. Sign in now to unlock personalized resources, track your wellness journey, and stay connected with our community of health experts.
            </p>

            <div className='flex space-x-3'>
                <GoogleButton onClick={handleSignIn} />
            </div>
        </div>
    )
}

export default Page