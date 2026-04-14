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
  { type: 'Open text',       icon: '¶',  description: 'Short or long text answer' },
  { type: 'Multiple choice', icon: '⊙',  description: 'Pick one from a list' },
  { type: 'Multi-select',    icon: '☑',  description: 'Pick multiple from a list' },
  { type: 'Number',          icon: '#',  description: 'Numeric input' },
  { type: 'Date',            icon: '📅', description: 'Date picker' },
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
        <Plus className="w-4 h-4" />
        Add field
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        {FIELD_OPTIONS.map(({ type, icon, description }) => (
          <DropdownMenuItem
            key={type}
            className="flex items-center gap-3 cursor-pointer py-2"
            onClick={() => onAdd(type)}
          >
            <span className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-sm shrink-0">
              {icon}
            </span>
            <div>
              <div className="text-sm font-medium">{type}</div>
              <div className="text-xs text-gray-400">{description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
