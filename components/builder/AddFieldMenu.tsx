'use client'

import { useState, useRef, useEffect } from 'react'
import { FieldType } from '@/types/form'

const FIELD_OPTIONS: { type: FieldType; icon: string; description: string }[] = [
  { type: 'Open text',       icon: 'T',  description: 'Single-line text field' },
  { type: 'Multiple choice', icon: '◉',  description: 'Select one option' },
  { type: 'Multi-select',    icon: '☑',  description: 'Select multiple options' },
  { type: 'Number',          icon: '#',  description: 'Numeric input' },
  { type: 'Date',            icon: '↗',  description: 'Date picker' },
  { type: 'Phone',           icon: '☎',  description: 'Phone number input' },
  { type: 'File upload',     icon: '📎', description: 'Let users attach files' },
  { type: 'Checkbox',        icon: '☑',  description: 'Single checkbox for agreements' },
  { type: 'Section Header',  icon: 'H',  description: 'Group fields under a heading' },
]

interface Props {
  onAdd: (type: FieldType) => void
}

export function AddFieldMenu({ onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 13px', border: '1px solid #e5e7eb', borderRadius: 6,
          background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151',
          cursor: 'pointer', fontFamily: 'inherit',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
        onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Add field
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0, width: 240,
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 50,
        }}>
          {FIELD_OPTIONS.map(({ type, icon, description }, i) => (
            <div
              key={type}
              onClick={() => { onAdd(type); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 14px', cursor: 'pointer',
                borderBottom: i < FIELD_OPTIONS.length - 1 ? '1px solid #f9fafb' : 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >
              <span style={{
                width: 26, height: 26, borderRadius: 5, background: '#f3f4f6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#6b7280', flexShrink: 0, fontWeight: 600,
              }}>
                {icon}
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{type}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
