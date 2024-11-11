/* eslint-disable react/no-children-prop */
'use client'
import React, { Fragment, useEffect, useState } from 'react'
import escapeHTML from 'escape-html'
import { Text } from 'slate'
import Image from 'next/image'
import { getImages } from './GetImages'

const SUPABASE_URL = 'https://eejowrrhyyummrlskjln.supabase.co' // Replace with your actual Supabase URL

const Serialize = ({ children }) => {
  const [imageData, setImageData] = useState({})

  useEffect(() => {
    const uploadIds = []
    children?.forEach((node) => {
      if (node.type === 'upload') {
        const id = Number(node.value)
        if (!uploadIds.includes(id)) {
          uploadIds.push(id)
        }
      }
    })

    if (uploadIds.length > 0) {
      // Fetch images asynchronously and set state
      Promise.all(uploadIds.map((id) => getImages(id))).then((results) => {
        const newImageData = {}
        results.forEach((result, index) => {
          if (result && result.length > 0) {
            const filename = result[0].filename
            newImageData[uploadIds[index]] = filename
          }
        })
        setImageData(newImageData)
      })
    }
  }, [children])

  return (
    <>
      {children?.map((node, i) => {
        if (Text.isText(node)) {
          let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

          if (node.bold) {
            text = <strong key={`bold-${i}`}>{text}</strong>
          }

          if (node.code) {
            text = <code key={`code-${i}`}>{text}</code>
          }

          if (node.italic) {
            text = <em key={`italic-${i}`}>{text}</em>
          }

          if (node.text === '') {
            text = <br key={`br-${i}`} />
          }

          return <Fragment key={`fragment-${i}`}>{text}</Fragment>
        }

        if (!node) {
          return null
        }

        switch (node.type) {
          case 'h1':
            return <h1 key={`h1-${i}`}>{<Serialize children={node.children} />}</h1>
          case 'h6':
            return <h6 key={`h6-${i}`}>{<Serialize children={node.children} />}</h6>
          case 'blockquote':
            return (
              <blockquote key={`blockquote-${i}`}>
                {<Serialize children={node.children} />}
              </blockquote>
            )
          case 'ul':
            return <ul key={`ul-${i}`}>{<Serialize children={node.children} />}</ul>
          case 'ol':
            return <ol key={`ol-${i}`}>{<Serialize children={node.children} />}</ol>
          case 'li':
            return <li key={`li-${i}`}>{<Serialize children={node.children} />}</li>
          case 'link':
            return (
              <a href={escapeHTML(node.url)} key={`link-${i}`}>
                {<Serialize children={node.children} />}
              </a>
            )
          case 'upload':
            const imageId = Number(node.value)
            const filename = imageData[imageId]
            console.log('filename', filename)

            // Construct the full Supabase URL
            const imageUrl = filename
              ? `${SUPABASE_URL}/storage/v1/object/public/media/${filename}`
              : ''

            return filename ? (
              <Image
                key={`upload-${imageId}`}
                src={imageUrl} // Use the correct Supabase URL
                alt={`${filename}`}
                width={200}
                height={200}
                className="pt-5"
              />
            ) : (
              <p key={`loading-${imageId}`}>Loading image...</p>
            )

          default:
            return <span key={`p-${i}`}>{<Serialize children={node.children} />}</span>
        }
      })}
    </>
  )
}

export default Serialize
