'use client'

import { useState } from 'react'
import { FormField, FormStep, FieldType } from '@/types/form'
import { createField, newId } from '@/lib/field-utils'
import { FieldRow } from '@/components/builder/FieldRow'
import { AddFieldMenu } from '@/components/builder/AddFieldMenu'
import { PhonePreview } from '@/components/preview/PhonePreview'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const defaultStep: FormStep = {
  id: newId(),
  stepNum: 1,
  sections: [
    {
      id: newId(),
      title: 'Default',
      fields: [
        {
          id: newId(),
          type: 'Open text',
          name: 'Description',
          helperText: 'Describe what you need in as much detail as possible',
          required: true,
        },
        {
          id: newId(),
          type: 'Open text',
          name: 'Location',
          helperText: 'Where does this request apply?',
          required: false,
          placeholder: '',
        },
        {
          id: newId(),
          type: 'File upload',
          name: 'Attachment',
          helperText: 'All file types accepted',
          required: false,
          uploadZoneText: 'Tap to upload',
          acceptedFileTypes: ['Images (JPG, PNG, GIF, WebP)', 'PDF', 'Word documents (.doc, .docx)', 'Spreadsheets (.xls, .xlsx)', 'Videos (.mp4, .mov)'],
        },
      ],
    },
  ],
}

export default function BuilderPage() {
  const [formTitle, setFormTitle] = useState('Physical Pass Card Request')
  const [ctaLabel, setCtaLabel] = useState('Acknowledge and Request')
  const [steps, setSteps] = useState<FormStep[]>([defaultStep])

  // Helpers to update a field inside the nested structure
  function updateField(stepId: string, sectionId: string, fieldId: string, updates: Partial<FormField>) {
    setSteps(prev => prev.map(step =>
      step.id !== stepId ? step : {
        ...step,
        sections: step.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: sec.fields.map(f => f.id !== fieldId ? f : { ...f, ...updates }),
          }
        ),
      }
    ))
  }

  function deleteField(stepId: string, sectionId: string, fieldId: string) {
    setSteps(prev => prev.map(step =>
      step.id !== stepId ? step : {
        ...step,
        sections: step.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: sec.fields.filter(f => f.id !== fieldId),
          }
        ),
      }
    ))
  }

  function addField(stepId: string, sectionId: string, type: FieldType) {
    const field = createField(type)
    setSteps(prev => prev.map(step =>
      step.id !== stepId ? step : {
        ...step,
        sections: step.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: [...sec.fields, field],
          }
        ),
      }
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <span className="font-semibold text-gray-900 text-sm">Form Builder</span>
        <nav className="flex items-center gap-1 ml-auto">
          <Link
            href="/builder"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-50 text-blue-600 border border-blue-200"
          >
            Builder
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          >
            User view
          </Link>
        </nav>
      </header>

      <div className="flex gap-6 p-6 max-w-[1100px] mx-auto">
        {/* Form editor — scrollable */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {/* Form title */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">Form title</Label>
              <Input
                className="h-9"
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">Submit button label (CTA)</Label>
              <Input
                className="h-9"
                value={ctaLabel}
                onChange={e => setCtaLabel(e.target.value)}
              />
            </div>
          </div>

          {/* Fields */}
          {steps.map(step =>
            step.sections.map(sec => (
              <div key={sec.id} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  {sec.fields.map(field => (
                    <FieldRow
                      key={field.id}
                      field={field}
                      onChange={updates => updateField(step.id, sec.id, field.id, updates)}
                      onDelete={() => deleteField(step.id, sec.id, field.id)}
                    />
                  ))}
                </div>
                <Separator className="my-1" />
                <AddFieldMenu onAdd={type => addField(step.id, sec.id, type)} />
              </div>
            ))
          )}
        </div>

        {/* Preview — sticky */}
        <div className="sticky top-6 self-start">
          <p className="text-xs text-gray-400 font-medium mb-3 text-center">Preview</p>
          <PhonePreview steps={steps} ctaLabel={ctaLabel} formTitle={formTitle} />
        </div>
      </div>
    </div>
  )
}
