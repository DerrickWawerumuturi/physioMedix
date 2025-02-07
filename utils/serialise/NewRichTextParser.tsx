'use client';
import escapeHTML from 'escape-html';
import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
  IS_CODE,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
} from './RichTextNodeFormat';
import { useEffect, useState } from 'react';
import { getImages } from './GetImages';
import localFont from 'next/font/local'

const LatoRegular = localFont({
  src: "../../app/fonts/Lato-Regular.ttf",
  weight: "200",
  style: "normal"
})


const SUPABASE_URL = 'https://eejowrrhyyummrlskjln.supabase.co';

function getLinkForPage(doc: any) {
  return 'implement this'
}

export function SerializeComponent({ children, setHeadings }: {
  children: import('./types').SerializedLexicalNode[]
  setHeadings?: (headings: {id: string, text:string, level: number}[]) => void;
}) {
  const [imageData, setImageData] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const extractedHeadings: {id: string, text:string, level: number}[] = []
    const uploadIds: number[] = [];

    children?.forEach((node) => {
      if (node.type === 'upload') {
        const id = Number(node.value);
        if (!uploadIds.includes(id)) {
          uploadIds.push(id);
        }
      } else if (node.type === "heading") {
        const text = node.children?.map((child) => child.text).join(' ') || '';
        const id = text.toLowerCase().replace(/\s+/g, '-');
        extractedHeadings.push({id, text, level: parseInt(node.tag.replace('h', ''))})
      }
    });


    if (setHeadings) setHeadings(extractedHeadings)

    if (uploadIds.length > 0) {
      // Fetch images asynchronously and set state
      Promise.all(uploadIds.map((id) => getImages(id))).then((results) => {
        const newImageData: { [key: number]: string } = {};
        results.forEach((result, index) => {
          if (result && result.length > 0) {
            const filename = result[0].filename;
            newImageData[uploadIds[index]] = filename;
          }
        });
        setImageData(newImageData);
      });
    }
  }, [children, setHeadings]); // Re-run effect when children changes

  const serialize = (nodes: import('./types').SerializedLexicalNode[]): string[] => {
    return nodes
      .map((node): string | null => {
        if (node.type === 'text') {
          let text = `${escapeHTML(node.text)}`;


          if (node.format & IS_BOLD) {
            text = `<strong class="font-bold">${text}</strong>`;

          }
          if (node.format & IS_ITALIC) {
            text = `<em class="italic">${text}</em>`;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = `<span class="line-through">${text}</span>`;
          }
          if (node.format & IS_UNDERLINE) {
            text = `<span class="underline">${text}</span>`;
          }
          if (node.format & IS_CODE) {
            text = `<code>${text}</code>`;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = `<sub>${text}</sub>`;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = `<sup>${text}</sup>`;
          }

          return `${text}`;
        }

        if (!node) {
          return null;
        }

        const serializedChildren = node.children ? serialize(node.children).join('') : '';

        switch (node.type) {
          case 'linebreak':
            return `<br>`;
          case 'paragraph':
            return `<p>${serializedChildren || '<br>'}</p>`;
          case 'link':
            const fields = node.fields || {}; // Safely access the `fields` property
            const linkUrl = fields.linkType === 'custom' ? fields.url || '#' : getLinkForPage(fields.doc);

            return `<a style="color: #8B5CF6" class="font-bold" href="${linkUrl}" ${
              fields.newTab ? ' target="_blank"' : ''
            } rel="${fields.sponsored ? 'sponsored ' : ''}${fields.nofollow ? 'nofollow ' : ''}${fields.rel || ''}">${
              serializedChildren || '' 
            }</a>`;
          case 'list':
            if (node.listType === 'bullet') {
              return `<ul class="list-disc mb-4 pl-8">${serializedChildren}</ul>`;
            } else {
              return `<ol class="list-decimal mb-4 pl-8">${serializedChildren}</ol>`;
            }
          case 'listitem':
            return `<li>${serializedChildren}</li>`;
          case 'upload':
            const imageId = Number(node.value);
            const filename = imageData[imageId];

            const imageUrl = filename
              ? `${SUPABASE_URL}/storage/v1/object/public/media/${filename}`
              : '';

            if (imageUrl) {
              return `<img key="upload-${imageId}" src="${imageUrl}" alt="${filename}" width="200" height="200" class="mt-16 rounded-md" />`;
            }
            return ''; // Handle case where no image data is available
          case 'heading':
            const text = serializedChildren
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
            return `< ${node.tag} class="scroll-mt-16">${serializedChildren}</${node.tag}>`;

          default:
            return serializedChildren || `<p><br></p>`; // Ensure empty paragraphs render
        }
      })
      .filter((node) => node !== null) as string[];
  };


  return (
    <div
      className={`text-lg whitespace-pre-wrap mb-5 ${LatoRegular.className}`}
      dangerouslySetInnerHTML={{
        __html: serialize(children).join(''),
      }}
    />
  );
}
