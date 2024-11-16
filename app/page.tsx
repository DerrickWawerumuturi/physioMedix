
import Footer from "@/components/Footer";
import GridBox from "@/components/GridBox";
import Navbar from "@/components/Navbar";
import { Meteors } from "@/components/ui/meteors";
import { Highlight } from "components/ui/hero-highlight";
import localFont from "next/font/local";
import { cn } from "utils/cn";



const AerialFont = localFont({
  src: "./fonts/AeonikProTRIAL-Bold.woff",
  weight: "400",
  style: "normal"
})

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn('py-20 items-center text-center max-w-3xl mx-auto flex flex-col  gap-5 sm:overflow-x-hidden md:overflow-x-visible')} suppressHydrationWarning>

        <div className="flex flex-col items-center">
          <h1
            className={cn("text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-7 text-center max-w-3xl")}>
            Empower Your Movement, <Highlight>Transform Your Health.</Highlight>
          </h1>
          <p className={`mt-6 text-lg text-muted-foreground text-center max-w-2xl ${AerialFont.className}`}>
            Discover expert tips, treatments, and exercises
            designed to help you move better,live pain-free,
            and achieve lasting well-being.
          </p>
        </div>
        <div
          className="flex animate-fade sm:mb-24 lg:mb-32 md:p-2">
          <GridBox />
        </div>

        <div className="my-20  mx-5 lg:-ml-64 pb-9 lg:mt-7 rounded-md antialiased  dark:bg-black dark:bg-grid-white/[0.05] justify-start items-start">
          <div className=" w-full relative max-w-7xl">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-2 w-2 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </div>

              <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                What&apos;s PhysioMedix about?
              </h1>

              <p className={`font-normal text-base text-slate-500 mb-4 relative z-50 text-left ${AerialFont.className}`}>
                A comprehensive platform dedicated to promoting awareness, education, and resources about physiotherapy. The website serves as a hub for physiotherapists, patients, students, and anyone interested in physical rehabilitation and movement science
              </p>

              {/* Meaty part - Meteor effect */}
              <Meteors number={20} />
            </div>
          </div>
        </div>
      </main>
      <div className="bottom-0">
        <Footer />
      </div>

    </div>
  );
}
