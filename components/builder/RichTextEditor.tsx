'use client'

import { useEffect, useRef, useState } from 'react'
import { Bold, Italic, Link } from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEmpty, setIsEmpty] = useState(!value)

  // Set initial HTML only on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function exec(cmd: string, val?: string) {
    editorRef.current?.focus()
    document.execCommand(cmd, false, val ?? undefined)
  }

  function handleLink() {
    const selection = window.getSelection()
    const isInsideLink = selection?.anchorNode?.parentElement?.closest('a')
    if (isInsideLink) {
      exec('unlink')
    } else {
      const url = prompt('Enter URL (include https://):')
      if (url) {
        exec('createLink', url)
        // Make link open in new tab
        const anchor = selection?.anchorNode?.parentElement?.closest('a')
        if (anchor) {
          anchor.setAttribute('target', '_blank')
          anchor.setAttribute('rel', 'noopener noreferrer')
        }
      }
    }
  }

  function handleInput() {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      setIsEmpty(html === '' || html === '<br>')
      onChange(html === '<br>' ? '' : html)
    }
  }

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden focus-within:border-blue-300">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1 border-b border-gray-100 bg-gray-50">
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          onMouseDown={e => { e.preventDefault(); exec('bold') }}
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          onMouseDown={e => { e.preventDefault(); exec('italic') }}
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          onMouseDown={e => { e.preventDefault(); handleLink() }}
          title="Insert / remove link"
        >
          <Link className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Editable area */}
      <div className="relative">
        {isEmpty && placeholder && (
          <span className="absolute left-[11px] top-2 text-[13px] text-gray-400 pointer-events-none select-none">
            {placeholder}
          </span>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="w-full px-[11px] py-2 text-[13px] text-gray-900 bg-white outline-none min-h-[36px] rich-text-editor"
          style={{ fontFamily: 'inherit' }}
          onInput={handleInput}
        />
      </div>
    </div>
  )
}
