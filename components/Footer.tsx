import localFont from 'next/font/local'
import Link from 'next/link'
import React from 'react'

const AerialFont = localFont({
    src: "../app/fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const Footer = () => {
    return (

        <footer className="bg-gradient-to-r lg:from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bottom-0 bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href={"/"}>
                        <h2 className={`self-center text-2xl font-semibold whitespace-nowrap dark:text-white ${AerialFont.className}`}>PhysioMedix</h2>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">PhysioMedix™</Link>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Footer