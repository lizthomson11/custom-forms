'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FieldType } from '@/types/form'
import { Type, CircleDot, CheckSquare, Hash, Calendar, Phone, Paperclip, Square, AlignLeft, Plus } from 'lucide-react'

const FIELD_OPTIONS: { type: FieldType; Icon: React.ElementType; description: string }[] = [
  { type: 'Open text',       Icon: Type,         description: 'Single-line text field' },
  { type: 'Multiple choice', Icon: CircleDot,    description: 'Select one option' },
  { type: 'Multi-select',    Icon: CheckSquare,  description: 'Select multiple options' },
  { type: 'Number',          Icon: Hash,         description: 'Numeric input' },
  { type: 'Date',            Icon: Calendar,     description: 'Date picker' },
  { type: 'Phone',           Icon: Phone,        description: 'Phone number input' },
  { type: 'File upload',     Icon: Paperclip,    description: 'Let users attach files' },
  { type: 'Checkbox',        Icon: Square,       description: 'Single checkbox for agreements' },
  { type: 'Section Header',  Icon: AlignLeft,    description: 'Group fields under a heading' },
]

interface Props {
  onAdd: (type: FieldType) => void
}

export function AddFieldMenu({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  function openMenu() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      })
    }
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const dropdown = open ? (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: dropdownPos.top,
        right: dropdownPos.right,
        width: 240,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        zIndex: 9999,
        overflow: 'hidden',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {FIELD_OPTIONS.map(({ type, Icon, description }, i) => (
        <div
          key={type}
          onClick={() => { onAdd(type); setOpen(false) }}
          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ borderBottom: i < FIELD_OPTIONS.length - 1 ? '1px solid #f3f4f6' : 'none' }}
        >
          <span className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
            <Icon className="w-3.5 h-3.5 text-gray-500" />
          </span>
          <div>
            <div className="text-[13px] font-medium text-gray-800">{type}</div>
            <div className="text-[11px] text-gray-400">{description}</div>
          </div>
        </div>
      ))}
    </div>
  ) : null

  return (
    <>
      <button
        ref={buttonRef}
        onClick={openMenu}
        className="flex items-center gap-1.5 px-3.5 py-[7px] border border-gray-200 rounded-md bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        style={{ fontFamily: 'inherit' }}
      >
        <Plus className="w-3.5 h-3.5" />
        Add field
      </button>
      {typeof document !== 'undefined' && dropdown ? createPortal(dropdown, document.body) : null}
    </>
  )
}
