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

const SUPABASE_URL = 'https://eejowrrhyyummrlskjln.supabase.co';

function getLinkForPage(doc: any) {
  return 'implement this'
}

export function SerializeComponent({ children }: { children: import('./types').SerializedLexicalNode[] }) {
  const [imageData, setImageData] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const uploadIds: number[] = [];
    children?.forEach((node) => {
      if (node.type === 'upload') {
        const id = Number(node.value);
        if (!uploadIds.includes(id)) {
          uploadIds.push(id);
        }
      }
    });

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
  }, [children]); // Re-run effect when children changes

  const serialize = (nodes: import('./types').SerializedLexicalNode[]): string[] => {
    return nodes
      .map((node): string | null => {
        if (node.type === 'text') {
          let text = `${escapeHTML(node.text)}`;

          if (node.format & IS_BOLD) {
            text = `<strong>${text}</strong>`;
          }
          if (node.format & IS_ITALIC) {
            text = `<em>${text}</em>`;
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

            return `<a style="color: blue" class="underline" href="${linkUrl}" ${
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
            return `<${node.tag}>${serializedChildren}</${node.tag}>`;

          default:
            return serializedChildren || `<p><br></p>`; // Ensure empty paragraphs render
        }
      })
      .filter((node) => node !== null) as string[];
  };


  return (
    <div
      className="text-2xl whitespace-pre-wrap mb-5"
      dangerouslySetInnerHTML={{
        __html: serialize(children).join(''),
      }}
    />
  );
}
