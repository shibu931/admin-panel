'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import TextAlign from '@tiptap/extension-text-align'
import * as LucideReact from 'lucide-react';
import { uploadImage } from '@/lib/actions/image.action';

const RichTextEditor = ({ data, setData, contentKey = 'content' }) => {  
  const [isSticky, setIsSticky] = useState(false);
  const toolbarRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const windowScrollY = window.scrollY;
      const toolbarHeight = toolbarRef.current?.offsetHeight || 0;
      setIsSticky(windowScrollY > toolbarHeight);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const editor = useEditor({
    extensions: [StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Link.configure({
        HTMLAttributes: {
          rel: 'blank', 
          target: '_blank',
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: 'mt-4',
        },
      }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      HorizontalRule,
      Image,
      ImageResize,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: data?.[contentKey] || '',
    onUpdate: ({ editor }) => {
      setData(prev => ({ ...prev, [contentKey]: editor.getHTML() })) ;
    },
    editorProps: {
      attributes: {
        class: 'border bg-muted/25 article border-muted/75 rounded-b focus:border-neutral-900 focus:outline-none p-2 min-h-[300px] w-full prose prose-sm focus:ring-[1px] focus:ring-neutral-600'
      }
    },
    immediatelyRender: false,
  });  
  
  useEffect(() => {
    console.log("Editor ",editor);
    
    if (editor && data !== editor.getHTML()) {
      editor.commands.setContent(data.content);
    }
  }, [data, editor]);

  const tools = [
    { name: 'Bold', action: () => editor.chain().focus().toggleBold().run(), icon: 'Bold', showLabel: false },
    { name: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), icon: 'Italic', showLabel: false },
    { name: 'Underline', action: () => editor.chain().focus().toggleUnderline().run(), icon: 'Underline', showLabel: false },
    { name: 'Strike', action: () => editor.chain().focus().toggleStrike().run(), icon: 'Strikethrough', showLabel: false },
    { name: 'Link', action: () => editor.chain().focus().setLink({ href: prompt('Enter URL:') }).run(), icon: 'Link', showLabel: false },
    { name: 'Heading 1', action: () => editor.chain().focus().setHeading({ level: 1 }).run(), icon: 'Heading', showLabel: false },
    { name: 'Heading 2', action: () => editor.chain().focus().setHeading({ level: 2 }).run(), icon: 'Heading2', showLabel: false },
    { name: 'Heading 3', action: () => editor.chain().focus().setHeading({ level: 3 }).run(), icon: 'Heading3', showLabel: false },
    { name: 'Heading 4', action: () => editor.chain().focus().setHeading({ level: 4 }).run(), icon: 'Heading4', showLabel: false },
    { name: 'Heading 5', action: () => editor.chain().focus().setHeading({ level: 5 }).run(), icon: 'Heading5', showLabel: false },
    { name: 'Heading 6', action: () => editor.chain().focus().setHeading({ level: 5 }).run(), icon: 'Heading6', showLabel: false },
    { name: 'Bullet List', action: () => editor.chain().focus().toggleBulletList().run(), icon: 'List', showLabel: false },
    { name: 'Ordered List', action: () => editor.chain().focus().toggleOrderedList().run(), icon: 'ListOrdered', showLabel: false },
    { name: 'Blockquote', action: () => editor.chain().focus().toggleBlockquote().run(), icon: 'Quote', showLabel: false },
    { name: 'Code Block', action: () => editor.chain().focus().toggleCodeBlock().run(), icon: 'Code', showLabel: false },
    { name: 'Horizontal Rule', action: () => editor.chain().focus().setHorizontalRule().run(), icon: 'Minus', showLabel: false },
    { name: 'Align Left', action: () => editor.chain().focus().setTextAlign('left').run(), icon: 'AlignLeft', showLabel: false },
    { name: 'Align Center', action: () => editor.chain().focus().setTextAlign('center').run(), icon: 'AlignCenter', showLabel: false },
    { name: 'Align Right', action: () => editor.chain().focus().setTextAlign('right').run(), icon: 'AlignRight', showLabel: false },
    {
      name: 'Image',
      action: async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
          const file = (event.target).files?.[0];
          if (file) {
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
              const altText = prompt('Enter alt text for the image:'); // Prompt for alt text
              editor.chain().focus().setImage({ src: imageUrl, alt: altText || '' }).run(); // Set alt attribute
            }
          }
        };
        input.click();
      },
      icon: 'ImageIcon',
      showLabel: false,
    },
  ];

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const handleToolClick = (action) => {
    action();
  };

  return (
    <div className=''>
      <div
        className={`p-2 border bg-background border-muted/75 rounded-t bg-base-100 flex flex-wrap space-x-2 space-y-2 ${isSticky ? 'sticky top-0 left-0 right-0 z-10' : ''
          }`}
        ref={toolbarRef} // Assign ref to toolbar element
      >
        {tools.map((tool) => {
          const Icon = LucideReact[tool.icon]; // Dynamically get the icon component

          if (!Icon) {
            console.error(`Icon "${tool.icon}" not found in Lucide React.`);
            return null; // Don't render anything if the icon is not found
          }

          return (
            <button
              type='button'
              key={tool.name}
              onClick={() => handleToolClick(tool.action)} 
              className="bg-muted/50 hover:bg-muted/75 border border-neutral-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center" // Added flex items-center
              title={tool.name}
            >
              <Icon className="w-4 h-4 mr-1" /> 
              {tool.showLabel && <span title={tool.name}>{tool.name}</span>} 
            </button>
          );
        })}
      </div>
      {editor && <EditorContent editor={editor} />}
    </div>
  );
};

export default RichTextEditor;