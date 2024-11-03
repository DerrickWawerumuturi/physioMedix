
import GridBox from "@/components/GridBox";
import { Highlight } from "components/ui/hero-highlight";
import { cn } from "utils/cn";
import "./globals.css"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/utils/utils";
import { Meteors } from "@/components/ui/meteors";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="h-screen max-h-screen py-20 items-center text-center max-w-3xl mx-auto flex flex-col  gap-5 sm:overflow-x-hidden md:overflow-x-visible" suppressHydrationWarning>

      <div className="flex flex-col items-center">
        <h1
          className={cn("text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-7 text-center max-w-3xl")}>
          Empower Your Movement, <Highlight>Transform Your Health.</Highlight>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-center max-w-2xl">
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
              What&apos;s PhysioPure about?
            </h1>

            <p className="font-normal text-base text-slate-500 mb-4 relative z-50 text-left">
              It exploring the science of physiology, offering readers in-depth insights into how the human body functions. From explaining the basics of organ systems to discussing the latest research in the field, the blog aims to make complex biological concepts
            </p>

            {/* Meaty part - Meteor effect */}
            <Meteors number={20} />
          </div>
        </div>
      </div>

      <div className="w-full lg:-ml-64">
        <Footer />
      </div>

    </div>
  );
}
