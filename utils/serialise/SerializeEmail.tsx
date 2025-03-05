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

export function serialize(nodes: any): string {
  if (!Array.isArray(nodes)) {
    console.error("serialize error: nodes is not an array", nodes);
    return "";
  }

  return nodes
    .map((node): string | null => {
      if (node.type === 'text') {
        let text = escapeHTML(node.text);

        if (node.format & IS_BOLD) text = `<strong>${text}</strong>`;
        if (node.format & IS_ITALIC) text = `<em>${text}</em>`;
        if (node.format & IS_STRIKETHROUGH) text = `<span class="line-through">${text}</span>`;
        if (node.format & IS_UNDERLINE) text = `<span class="underline">${text}</span>`;
        if (node.format & IS_CODE) text = `<code>${text}</code>`;
        if (node.format & IS_SUBSCRIPT) text = `<sub>${text}</sub>`;
        if (node.format & IS_SUPERSCRIPT) text = `<sup>${text}</sup>`;

        return text;
      }

      if (!node) return null;

      const serializedChildren = node.children ? serialize(node.children) : '';

      switch (node.type) {
        case 'paragraph':
          return `<p>${serializedChildren}</p>`;
        case 'heading':
          return `<h${node.tag}>${serializedChildren}</h${node.tag}>`;
        case 'list':
          return node.listType === 'bullet'
            ? `<ul>${serializedChildren}</ul>`
            : `<ol>${serializedChildren}</ol>`;
        case 'listitem':
          return `<li>${serializedChildren}</li>`;
        case 'link':
          return `<a href="${node.url}" target="_blank">${serializedChildren}</a>`;
        default:
          return serializedChildren || `<p><br></p>`;
      }
    })
    .filter(Boolean)
    .join('');
}

