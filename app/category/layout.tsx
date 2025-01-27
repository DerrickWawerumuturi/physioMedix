import React from 'react'
import '@payloadcms/next/css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/ThemeProvider'


const CategoryLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {

  return (
    <html suppressHydrationWarning>
    <body>
    <ThemeProvider
      attribute={"class"}
      defaultTheme={"system"}
      enableSystem
    >
      <Navbar />
      {children}
        <Footer />
      <Toaster position={"top-center"} richColors />
    </ThemeProvider>
    </body>
    </html>
  )
}

export default CategoryLayout
