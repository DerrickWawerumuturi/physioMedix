import { redirect } from 'next/navigation'

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`)
}

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Categories = [
  {
    name: 'Orthopedic',
    url: '/orthopedics',
    description:
      'Orthopedic Care and Solutions: Topics related to the treatment and prevention of musculoskeletal conditions. Learn about innovative procedures, recovery tips, and how to manage injuries affecting bones, joints, and muscles.',
  },
  {
    name: 'Physiotherapy',
    url: '/physiotherapy',
    description:
      ' Discover the latest in physiotherapy techniques, exercises, and rehabilitation practices to help you recover from injuries, manage pain, and improve mobility and function',
  },
  {
    name: 'Pediatric',
    url: '/pediatric',
    description:
      "Focused on the health of children and adolescents, this blog provides insights into pediatric care, common childhood conditions, and tips to support your child's growth and development.",
  },
  {
    name: 'Neurology',
    url: '/neurology',
    description:
      'Stay informed about neurological disorders, treatments, and advances in understanding the brain and nervous system. Our blog offers advice and research on managing conditions like epilepsy, stroke, and neurodegenerative diseases.',
  },
  {
    name: 'Patient',
    url: '/patient',
    description:
      'Delve into topics that center around patient care, experiences, and the journey through medical treatment. This blog is for patients and caregivers looking for support, stories, and resources',
  },
  {
    name: 'Testimonials and Case Studies',
    url: '/testimonials-and-caseStudies',
    description:
      'Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.',
  },
  {
    name: 'Wellness and Lifestyle',
    url: '/wellness-and-lifestyle',
    description:
      'Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.',
  },
  {
    name: 'Cardiopulmology',
    url: '/cardiopulmology',
    description:
      'Read real-world stories and case studies from patients who have navigated various medical conditions. These testimonials highlight their experiences, treatments, and outcomes.',
  },
  {
    name: 'Physiotherapy',
    url: '/physiotherapy',
    description:
      'Focused on issues unique to women’s health, this blog addresses everything from reproductive health to wellness strategies for women at every stage of life.',
  },
  {
    name: 'Women’s Health',
    url: '/womens-health',
    description: '',
  },
]

export const strip = (url: string) => {
  if (typeof url === 'string') {
    const imageUrl = url.replace(/^https:\/\/physio-med-tt89.vercel.app/, '')
    return imageUrl
  }
}

export const formatDate = (date: string) => {
  if (date) {
    const validDate = typeof date === 'string' ? new Date(date) : date
    return validDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }
  return 'Date not available'
}

export const Capitalize = (word: string) => {
  return word.toUpperCase()
}

export const convertToOriginalTitle = (formattedTitle: string) => {
  return formattedTitle.replace(/-/g, ' ').replace(/%7C/g, '')
}

export const allowedEmails = [
  'marionkorgoren@gmail.com',
  'alexvictorkibet60@gmail.com',
  'simonmuriukimars@gmail.com',
  'wawerumuturi57@gmail.com',
]
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, '')
}

export const testimonials = [
  {
    quote:
      'Reading these articles on physiotherapy transformed my recovery process. The practical tips and exercises provided helped me regain my strength faster than I ever imagined.',
    name: 'Wanjiru Njeri',
    title: 'Physical Therapy Patient',
  },
  {
    quote:
      'The insights on mental health were eye-opening. I learned techniques to manage stress and anxiety that I can easily incorporate into my daily routine.',
    name: 'David Mwangi',
    title: 'Mental Health Advocate',
  },
  {
    quote:
      'As someone with a heart condition, I found the cardiology articles to be incredibly informative. They empowered me to take charge of my health with knowledge and actionable advice.',
    name: 'Aisha Abdi',
    title: 'Heart Health Enthusiast',
  },
  {
    quote:
      'The testimonials and stories shared on this blog resonate deeply. It’s reassuring to know that others are on similar journeys, and it motivates me to keep pushing forward.',
    name: 'Juma Karanja',
    title: 'Physiotherapy Patient',
  },
  {
    quote:
      'The blend of evidence-based information and personal experiences makes this blog a must-read. It has truly changed my perspective on managing my mental health.',
    name: 'Fatma Juma',
    title: 'Mental Health Coach',
  },
  {
    quote:
      'I appreciate how the blog addresses complex topics in cardiology in a straightforward manner. It makes it easier for patients like me to understand our conditions.',
    name: 'Kamau Mwenda',
    title: 'Cardiology Patient',
  },
]
