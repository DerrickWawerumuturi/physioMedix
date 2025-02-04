'use client'
import localFont from 'next/font/local'
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'


const AerialFont = localFont({
    src: "../app/fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const Footer = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }


    return (

        <footer className="bg-oxford-950">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href={"/"}>
                        <h2 className={`hover:underline  self-center text-2xl font-semibold whitespace-nowrap text-white ${AerialFont.className}`}>PhysioMedix</h2>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="https://wa.me/+254726671319" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-600 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">© 2024 <Link href="/" className="hover:underline">PhysioMedix™</Link>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Footer