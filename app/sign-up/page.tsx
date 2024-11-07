import React from 'react'
import localFont from 'next/font/local'
import AuthForm from '@/components/AuthForm'
import "../globals.css"

const AerialFont = localFont({
    src: "../fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const page = () => {
    return (
        <div className={`min-h-screen flex items-center justify-center align-center flex-col gap-4 -mt-16 ${AerialFont.className}`}>
            <h1 className={`text-4xl font-bold text-center ${AerialFont.className}`}>Welcome to Physiomedix</h1>
            <p className={`text-lg text-gray-700 text-center max-w-2xl font-semibold ${AerialFont.className} break-words`}>
                <span className='text-blue-600 pr-2'>Sign Up</span> and  experience the future of physiotherapy with Physiomedix.
            </p>
            <div className='-ml-28 flex space-x-3 justify-start max-w-[496px]'>
                <AuthForm />
            </div>
        </div>
    )
}

export default page