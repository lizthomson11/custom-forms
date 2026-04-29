'use client'

import { FormField, FILE_TYPE_OPTIONS } from '@/types/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { FieldTargeting } from './FieldTargeting'

interface Props {
  field: FormField
  onChange: (updates: Partial<FormField>) => void
}

const FIELD_SPECIFIC_TYPES = ['Open text', 'Number', 'Phone', 'Date', 'File upload']

export function AdvancedSettings({ field, onChange }: Props) {
  const [open, setOpen] = useState(false)

  const hasFieldSpecific = FIELD_SPECIFIC_TYPES.includes(field.type)
  // Section Header has no targeting or advanced settings
  if (field.type === 'Section Header') return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mt-2 select-none">
        <ChevronRight className={`w-3 h-3 transition-transform ${open ? 'rotate-90' : ''}`} />
        Advanced settings
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 p-3 bg-gray-100 rounded-md flex flex-col gap-3">
          <FieldTargeting field={field} onChange={onChange} />
          {hasFieldSpecific && <hr className="border-gray-200" />}

          {/* Open text: placeholder + min/max chars */}
          {field.type === 'Open text' && (
            <>
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-medium">Placeholder text</Label>
                <p className="text-[11px] text-gray-400">Shown inside the input before the user types</p>
                <Input
                  className="h-8 text-xs"
                  value={field.placeholder ?? ''}
                  placeholder="Add placeholder text…"
                  onChange={e => onChange({ placeholder: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <Label className="text-xs font-medium">Min characters</Label>
                  <p className="text-[11px] text-gray-400">Leave blank for no minimum</p>
                  <Input
                    className="h-8 text-xs"
                    type="number"
                    min={0}
                    placeholder="e.g. 10"
                    value={field.minChars ?? ''}
                    onChange={e => onChange({ minChars: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <Label className="text-xs font-medium">Max characters</Label>
                  <p className="text-[11px] text-gray-400">Leave blank for no maximum</p>
                  <Input
                    className="h-8 text-xs"
                    type="number"
                    min={0}
                    placeholder="e.g. 500"
                    value={field.maxChars ?? ''}
                    onChange={e => onChange({ maxChars: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </div>
              </div>
            </>
          )}

          {/* Number: placeholder + min/max value */}
          {field.type === 'Number' && (
            <>
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-medium">Placeholder text</Label>
                <p className="text-[11px] text-gray-400">Shown inside the input before the user types</p>
                <Input
                  className="h-8 text-xs"
                  value={field.placeholder ?? ''}
                  placeholder="Add placeholder text…"
                  onChange={e => onChange({ placeholder: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <Label className="text-xs font-medium">Min value</Label>
                  <Input
                    className="h-8 text-xs"
                    type="number"
                    placeholder="e.g. 0"
                    value={field.minValue ?? ''}
                    onChange={e => onChange({ minValue: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <Label className="text-xs font-medium">Max value</Label>
                  <Input
                    className="h-8 text-xs"
                    type="number"
                    placeholder="e.g. 100"
                    value={field.maxValue ?? ''}
                    onChange={e => onChange({ maxValue: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </div>
              </div>
            </>
          )}

          {/* Phone: placeholder */}
          {field.type === 'Phone' && (
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">Placeholder text</Label>
              <p className="text-[11px] text-gray-400">Shown inside the input before the user types</p>
              <Input
                className="h-8 text-xs"
                value={field.placeholder ?? ''}
                onChange={e => onChange({ placeholder: e.target.value })}
              />
            </div>
          )}

          {/* Date: placeholder + weekdays/weekends */}
          {field.type === 'Date' && (
            <>
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-medium">Placeholder text</Label>
                <p className="text-[11px] text-gray-400">Shown inside the input before the user selects a date</p>
                <Input
                  className="h-8 text-xs"
                  value={field.placeholder ?? ''}
                  onChange={e => onChange({ placeholder: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Weekdays only</p>
                  <p className="text-[11px] text-gray-400">Saturdays and Sundays will be unavailable</p>
                </div>
                <Switch
                  checked={!!field.weekdaysOnly}
                  onCheckedChange={v => onChange({ weekdaysOnly: v, weekendsOnly: v ? false : field.weekendsOnly })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Weekends only</p>
                  <p className="text-[11px] text-gray-400">Monday through Friday will be unavailable</p>
                </div>
                <Switch
                  checked={!!field.weekendsOnly}
                  onCheckedChange={v => onChange({ weekendsOnly: v, weekdaysOnly: v ? false : field.weekdaysOnly })}
                />
              </div>
            </>
          )}

          {/* File upload: upload zone text + max files + file types */}
          {field.type === 'File upload' && (
            <>
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-medium">Upload zone text</Label>
                <p className="text-[11px] text-gray-400">Shown inside the upload area</p>
                <Input
                  className="h-8 text-xs"
                  value={field.uploadZoneText ?? 'Tap to upload'}
                  onChange={e => onChange({ uploadZoneText: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-medium">Max files</Label>
                <p className="text-[11px] text-gray-400">Platform default — engineering team will determine the right limit based on performance.</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium">Accepted file types</Label>
                <p className="text-[11px] text-gray-400">All types accepted by default — deselect to restrict</p>
                {FILE_TYPE_OPTIONS.map(ft => (
                  <label key={ft} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={field.acceptedFileTypes?.includes(ft) ?? true}
                      onChange={e => {
                        const current = field.acceptedFileTypes ?? [...FILE_TYPE_OPTIONS]
                        const next = e.target.checked
                          ? [...current, ft]
                          : current.filter(t => t !== ft)
                        onChange({ acceptedFileTypes: next })
                      }}
                    />
                    {ft}
                  </label>
                ))}
              </div>
            </>
          )}

        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
