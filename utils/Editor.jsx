import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'
import { Text } from 'slate'
import Image from 'next/image'

const Serialize = (children) =>
  children?.map((node, i) => {
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
        return <h1 key={`h1-${i}`}>{Serialize(node.children)}</h1>
      case 'h6':
        return <h6 key={`h6-${i}`}>{Serialize(node.children)}</h6>

      case 'blockquote':
        return <blockquote key={`blockquote-${i}`}>{Serialize(node.children)}</blockquote>
      case 'ul':
        return <ul key={`ul-${i}`}>{Serialize(node.children)}</ul>
      case 'ol':
        return <ol key={`ol-${i}`}>{Serialize(node.children)}</ol>
      case 'li':
        return <li key={`li-${i}`}>{Serialize(node.children)}</li>
      case 'link':
        return (
          <a href={escapeHTML(node.url)} key={`link-${i}`}>
            {Serialize(node.children)}
          </a>
        )
      case 'upload':
        if (node.type === 'upload') {
          console.log(node)
          const imageUrl = node.value.url
          const imageKey = node.value.id || `image-${i}`
          if (imageUrl !== undefined) {
            return (
              <Image
                src={`${imageUrl}`}
                alt={node.value.alt || 'Image'}
                key={imageKey}
                width={node.value.width || 200}
                height={node.value.height || 200}
              />
            )
          }
          return null
        }

      default:
        return <span key={`p-${i}`}>{Serialize(node.children)}</span>
    }
  })

export default Serialize
