'use client'

import { FieldType } from '@/types/form'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus } from 'lucide-react'

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-[7px] border border-gray-200 rounded-md bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
        <Plus className="w-3 h-3" />
        Add field
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{ width: 240 }}
      >
        {FIELD_OPTIONS.map(({ type, icon, description }) => (
          <DropdownMenuItem
            key={type}
            style={{ padding: '9px 14px', borderBottom: '1px solid #f9fafb', cursor: 'pointer' }}
            className="flex items-center gap-2.5 last:border-b-0"
            onClick={() => onAdd(type)}
          >
            <span
              className="flex items-center justify-center shrink-0 text-[11px] font-semibold text-gray-500"
              style={{ width: 26, height: 26, borderRadius: 5, background: '#f3f4f6' }}
            >
              {icon}
            </span>
            <div>
              <div className="text-[13px] font-medium text-gray-900">{type}</div>
              <div className="text-[11px] text-gray-400">{description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
