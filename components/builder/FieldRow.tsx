'use client'

import { useState } from 'react'
import { FormField } from '@/types/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, GripVertical, Trash2 } from 'lucide-react'
import { FieldTypeBadge } from './FieldTypeBadge'
import { AdvancedSettings } from './AdvancedSettings'
import { OptionsEditor } from './OptionsEditor'

interface Props {
  field: FormField
  onChange: (updates: Partial<FormField>) => void
  onDelete: () => void
}

export function FieldRow({ field, onChange, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const isChoice = field.type === 'Multiple choice' || field.type === 'Multi-select'
  const isSection = field.type === 'Section Header'
  const isCheckbox = field.type === 'Checkbox'

  if (isSection) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-200 bg-gray-50">
        <GripVertical className="w-4 h-4 text-gray-300 shrink-0 cursor-grab" />
        <Input
          className="h-7 text-xs font-semibold border-none bg-transparent p-0 focus-visible:ring-0 shadow-none"
          value={field.name}
          placeholder="Section heading…"
          onChange={e => onChange({ name: e.target.value })}
        />
        <FieldTypeBadge type={field.type} />
        <button
          onClick={onDelete}
          className="text-gray-300 hover:text-red-400 transition-colors ml-auto shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        {/* Row top */}
        <CollapsibleTrigger className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left">
          <GripVertical className="w-4 h-4 text-gray-300 shrink-0 cursor-grab" />
          <span className={`flex-1 text-sm truncate ${field.name === field.type ? 'text-gray-400 italic' : 'text-gray-700'}`}>
            {field.name || field.type}
          </span>
          <FieldTypeBadge type={field.type} />
          <button
            onClick={e => { e.stopPropagation(); onDelete() }}
            className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>

        {/* Editor */}
        <CollapsibleContent>
          <div className="px-3 pb-3 flex flex-col gap-3 border-t border-gray-100 pt-3">

            {/* Field name */}
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">Field name</Label>
              <Input
                className="h-8 text-xs"
                value={field.name}
                placeholder={`e.g. ${field.type}`}
                onChange={e => onChange({ name: e.target.value })}
              />
            </div>

            {/* Helper text */}
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">
                Helper text{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </Label>
              <p className="text-[11px] text-gray-400">
                {isCheckbox ? 'Shown below the checkbox for extra context' : 'Shown below the field to give users more context'}
              </p>
              <Input
                className="h-8 text-xs"
                value={field.helperText}
                placeholder="Add helper text…"
                onChange={e => onChange({ helperText: e.target.value })}
              />
            </div>

            <Separator />

            {/* Options */}
            {isChoice && field.options && (
              <>
                <OptionsEditor
                  options={field.options}
                  onChange={options => onChange({ options })}
                />
                <Separator />
              </>
            )}

            {/* Required toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Required</span>
              <Switch
                checked={field.required}
                onCheckedChange={v => onChange({ required: v })}
              />
            </div>

            {/* Advanced settings */}
            <AdvancedSettings field={field} onChange={onChange} />

          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
