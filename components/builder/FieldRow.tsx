'use client'

import { useState } from 'react'
import { FormField } from '@/types/form'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { GripVertical, Trash2, ChevronDown, Lock } from 'lucide-react'
import { FieldTypeBadge } from './FieldTypeBadge'
import { AdvancedSettings } from './AdvancedSettings'
import { OptionsEditor } from './OptionsEditor'

interface Props {
  field: FormField
  onChange: (updates: Partial<FormField>) => void
  onDelete: () => void
  draggable?: boolean
  onDragStart?: (e: React.DragEvent) => void
}

export function FieldRow({ field, onChange, onDelete, draggable, onDragStart }: Props) {
  const [open, setOpen] = useState(false)

  const isChoice = field.type === 'Multiple choice' || field.type === 'Multi-select'
  const isSection = field.type === 'Section Header'
  const isCheckbox = field.type === 'Checkbox'
  const isSystem = !!field.system

  if (isSection) {
    return (
      <div className="flex items-center gap-2.5 px-5 py-2 bg-gray-50 border-b border-gray-100" draggable={draggable} onDragStart={onDragStart}>
        <GripVertical className="w-3.5 h-3.5 text-gray-300 shrink-0 cursor-grab" />
        <input
          className="flex-1 bg-transparent border-none outline-none text-[13px] font-semibold text-gray-700 placeholder:text-gray-400 placeholder:font-normal"
          value={field.name}
          placeholder="Section heading…"
          onChange={e => onChange({ name: e.target.value })}
        />
        <FieldTypeBadge type={field.type} />
        <button
          onClick={onDelete}
          className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div className="border-b border-gray-100 last:border-b-0" draggable={draggable} onDragStart={onDragStart}>
      {/* Row top */}
      <div
        className="flex items-center gap-2.5 px-5 py-[11px] cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <GripVertical className="w-3.5 h-3.5 text-gray-300 shrink-0 cursor-grab" />
        <span className={`flex-1 text-[13px] truncate ${field.name && field.name !== field.type ? 'text-gray-700' : 'text-gray-400 italic'}`}>
          {field.name || field.type}
        </span>
        <FieldTypeBadge type={field.type} />
        {isSystem ? (
          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 shrink-0">
            <Lock className="w-2.5 h-2.5" /> System field
          </span>
        ) : (
          <button
            onClick={e => { e.stopPropagation(); onDelete() }}
            className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {/* Editor — slides open inline */}
      {open && (
        <div className="flex flex-col gap-3.5 px-5 pb-5 pt-4 pl-11 bg-[#fafafa] border-t border-gray-100">

          {/* Field name */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-gray-700">Field name</label>
            <input
              className={`w-full px-[11px] py-2 border border-gray-200 rounded-md text-[13px] bg-white focus:outline-none ${isSystem ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 focus:border-blue-300'}`}
              style={{ fontFamily: 'inherit' }}
              value={field.name}
              placeholder={`e.g. ${field.type}`}
              readOnly={isSystem}
              onChange={isSystem ? undefined : e => onChange({ name: e.target.value })}
            />
          </div>

          {/* Helper text */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-gray-700">
              Helper text <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <span className="text-[11px] text-gray-400 -mt-0.5">
              {isCheckbox ? 'Shown below the checkbox for extra context' : 'Shown below the field to give users more context'}
            </span>
            <input
              className="w-full px-[11px] py-2 border border-gray-200 rounded-md text-[13px] text-gray-900 bg-white focus:outline-none focus:border-blue-300"
              style={{ fontFamily: 'inherit' }}
              value={field.helperText}
              placeholder="Add helper text…"
              onChange={e => onChange({ helperText: e.target.value })}
            />
          </div>

          <hr className="border-gray-200" />

          {/* Options */}
          {isChoice && field.options && (
            <>
              <OptionsEditor
                options={field.options}
                onChange={options => onChange({ options })}
              />
              <hr className="border-gray-200" />
            </>
          )}

          {/* Required toggle */}
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-gray-700">Required</span>
            <Switch
              checked={field.required}
              onCheckedChange={v => onChange({ required: v })}
            />
          </div>

          {/* Advanced settings */}
          <AdvancedSettings field={field} onChange={onChange} />

        </div>
      )}
    </div>
  )
}
