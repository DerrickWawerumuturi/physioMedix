'use client'

import React, { useState } from 'react'
import { Figtree } from "next/font/google"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ImSpinner2 } from 'react-icons/im'

const figtree = Figtree({ subsets: ['latin'] })

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = () => {

  }


  return (
    <section className={`relative bg-oxford-900 mb-20 pt-[8rem] pb-[10rem] overflow-hidden`}>
      <div className={"absolute right-0 top-0 hidden sm:block"}>
        <svg className="max-w-[120px] xl:max-w-[180px] 2xl:max-w-none text-white" width="240" viewBox="0 0 240 360"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1912_7)">
            <path d="M240 120L120 120L120 -5.24537e-06L240 120Z" fill="#D4E5F5"></path>
            <path d="M120 0H240V120L120 0Z" fill="currentColor"></path>
            <g clipPath="url(#clip1_1912_7)">
              <path d="M120 239.25L240.036 359.286" stroke="#15395B" strokeWidth="1.1542"></path>
            </g>
            <path
              d="M240 239.25L240 238.096L241.154 238.096L241.154 239.25L240 239.25ZM238.846 359.25L238.846 239.25L241.154 239.25L241.154 359.25L238.846 359.25ZM240 240.404L120 240.404L120 238.096L240 238.096L240 240.404Z"
              fill="#15395B" mask="url(#path-3-inside-1_1912_7)"></path>
            <g clipPath="url(#clip2_1912_7)">
              <path d="M0.292389 0L120.329 120.036" stroke="#15395B" strokeWidth="1.1542"></path>
            </g>
            <path
              d="M120.292 0H121.447V-1.1542H120.292V0ZM0.292389 1.1542H120.292V-1.1542H0.292389V1.1542ZM119.138 0V120H121.447V0H119.138Z"
              fill="#15395B" mask="url(#path-6-inside-2_1912_7)"></path>
            <g clipPath="url(#clip3_1912_7)">
              <path d="M119.964 120.25H239.964V240.25L119.964 120.25Z" fill="#002333"></path>
            </g>
            <rect x="239.423" y="120.827" width="118.846" height="118.846" transform="rotate(90 239.423 120.827)"
                  stroke="#15395B" strokeWidth="1.1542"></rect>
          </g>
          <defs>
            <clipPath id="clip0_1912_7">
              <rect width="360" height="240" fill="white" transform="translate(240) rotate(90)"></rect>
            </clipPath>
            <clipPath id="clip1_1912_7">
              <path d="M120 239.25L120 359.25L240 359.25L240 239.25L120 239.25Z" fill="white"></path>
            </clipPath>
            <clipPath id="clip2_1912_7">
              <path d="M0.292389 0H120.292V120H0.292389V0Z" fill="white"></path>
            </clipPath>
            <clipPath id="clip3_1912_7">
              <rect x="240" y="120.25" width="120" height="120" transform="rotate(90 240 120.25)" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={'absolute left-0 top-0 hidden sm:block'}>
        <svg className="max-w-[120px] xl:max-w-[180px] 2xl:max-w-none" width="240" viewBox="0 0 240 240" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1881_953)">
            <g clipPath="url(#clip1_1881_953)">
              <path d="M0 241L120 121" stroke="#15395B" strokeWidth="1.15942"></path>
            </g>
            <path
              d="M5.24537e-06 120L5.29605e-06 118.841L-1.15941 118.841L-1.15941 120L5.24537e-06 120ZM1.15942 240L1.15943 120L-1.15941 120L-1.15942 240L1.15942 240ZM5.19469e-06 121.159L120 121.159L120 118.841L5.29605e-06 118.841L5.19469e-06 121.159Z"
              fill="#15395B" mask="url(#path-1-inside-1_1881_953)"></path>
            <g clipPath="url(#clip2_1881_953)">
              <path d="M120 121L240 0.999999" stroke="#15395B" strokeWidth="1.15942"></path>
            </g>
            <path
              d="M120 -3.8147e-06L120 -1.15942L118.841 -1.15942L118.841 -3.86538e-06L120 -3.8147e-06ZM121.159 120L121.159 -3.76402e-06L118.841 -3.86538e-06L118.841 120L121.159 120ZM120 1.15942L240 1.15942L240 -1.15942L120 -1.15942L120 1.15942Z"
              fill="#15395B" mask="url(#path-4-inside-2_1881_953)"></path>
            <path
              d="M0 120L-1.15942 120L-1.15942 121.159L-5.06799e-08 121.159L0 120ZM5.24537e-06 0L5.29605e-06 -1.15942L-1.15941 -1.15942L-1.15941 -5.06798e-08L5.24537e-06 0ZM120 5.24537e-06L121.159 5.29605e-06L121.159 -1.15941L120 -1.15941L120 5.24537e-06ZM120 120L120 121.159L121.159 121.159L121.159 120L120 120ZM1.15942 120L1.15943 5.06798e-08L-1.15941 -5.06798e-08L-1.15942 120L1.15942 120ZM5.19469e-06 1.15942L120 1.15943L120 -1.15941L5.29605e-06 -1.15942L5.19469e-06 1.15942ZM118.841 5.19469e-06L118.841 120L121.159 120L121.159 5.29605e-06L118.841 5.19469e-06ZM120 118.841L5.06799e-08 118.841L-5.06799e-08 121.159L120 121.159L120 118.841Z"
              fill="#15395B" mask="url(#path-7-inside-3_1881_953)"></path>
          </g>
          <defs>
            <clipPath id="clip0_1881_953">
              <rect width="240" height="240" fill="white" transform="translate(0 240) rotate(-90)"></rect>
            </clipPath>
            <clipPath id="clip1_1881_953">
              <path d="M0 240L5.24537e-06 120L120 120L120 240L0 240Z" fill="white"></path>
            </clipPath>
            <clipPath id="clip2_1881_953">
              <path d="M120 120L120 -3.8147e-06L240 1.43067e-06L240 120L120 120Z" fill="white"></path>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={"max-width mx-auto w-full"}>
        <div className={`${figtree.className} flex flex-col items-center gap-6 text-center relative lg:flex-row lg:gap-8 lg:justify-between lg:text-left`}>
          <div className={"rich-text relative max-w-[479px] space-y-4"}>
            <h2 className={"font-bold  text-light-blue-800 text-sm "}>NEWSLETTER</h2>
            <p className={"font-semibold text-white text-2xl mb-4"}>Stay in the loop</p>
            <p className={"text-white text-xl sm:w-[200px] lg:w-full "}>Subscribe to our newsletter for the latest articles and blogs about physiotherapy</p>
          </div>
          <div className={"flex space-x-3 rich-text relative max-w-[479px]"}>
            <Input placeholder={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} className={"bg-white"} />
            <Button
              onClick={handleSubmit}
              variant={"green"}
              className={"text-lg"}
            >
              {isLoading ? <ImSpinner2 className={"animate-spin"} /> : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Newsletter
