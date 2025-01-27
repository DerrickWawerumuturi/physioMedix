import React from 'react'
import Navbar from '@/components/Navbar'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/ThemeProvider'


const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {


  return (
    <html suppressHydrationWarning className={"light"}>
    <body>
    <ThemeProvider
      attribute={"class"}
      defaultTheme={"system"}
      enableSystem
    >
      <Navbar />
      {children}
      <Toaster position={"top-center"} richColors />
    </ThemeProvider>
    </body>
    </html>
  )
}

export default Layout
