'use client'

import { useState } from 'react'
import { FormField, FormStep, FieldType } from '@/types/form'
import { createField, newId } from '@/lib/field-utils'
import { FieldRow } from '@/components/builder/FieldRow'
import { AddFieldMenu } from '@/components/builder/AddFieldMenu'
import { PhonePreview } from '@/components/preview/PhonePreview'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const defaultStep: FormStep = {
  id: 'step-1',
  stepNum: 1,
  sections: [
    {
      id: 'section-1',
      title: 'Default',
      fields: [
        {
          id: 'field-description',
          type: 'Open text',
          name: 'Description',
          helperText: 'Describe what you need in as much detail as possible',
          required: true,
          system: true,
        },
        {
          id: 'field-location',
          type: 'Open text',
          name: 'Location',
          helperText: 'Where does this request apply?',
          required: false,
          placeholder: '',
        },
        {
          id: 'field-attachment',
          type: 'File upload',
          name: 'Attachment',
          helperText: 'All file types accepted',
          required: false,
          uploadZoneText: 'Tap to upload',
          acceptedFileTypes: ['Images (JPG, PNG, GIF, WebP)', 'PDF', 'Word documents (.doc, .docx)', 'Spreadsheets (.xls, .xlsx)', 'Videos (.mp4, .mov)'],
        },
        {
          id: 'field-section-access',
          type: 'Section Header',
          name: 'Access Request Details',
          helperText: '',
          required: false,
        },
        {
          id: 'field-access-areas',
          type: 'Open text',
          name: 'Access Areas',
          helperText: 'Provide any other areas you will need access.',
          required: true,
          placeholder: 'Enter access areas',
        },
        {
          id: 'field-acknowledgment',
          type: 'Checkbox',
          name: 'I confirm the details of this request are accurate',
          helperText: 'Please review your request details before submitting.',
          required: true,
        },
      ],
    },
  ],
}

export default function BuilderPage() {
  const [formTitle, setFormTitle] = useState('Physical Pass Card')
  const [formDescription, setFormDescription] = useState('Submit your Physical Pass Card requests')
  const [ctaLabel, setCtaLabel] = useState('Acknowledge and Request')
  const [steps, setSteps] = useState<FormStep[]>([defaultStep])

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
    <div className="min-h-screen" style={{ background: '#f4f5f7', fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif" }}>

      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 flex items-center px-6 gap-3.5" style={{ height: 54 }}>
        <Link href="/list" className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 no-underline">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to request forms
        </Link>
        <span className="text-[17px] font-bold text-gray-900 flex-1">Edit Form Template</span>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-md text-[13px] font-medium text-gray-700 cursor-pointer">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          Draft
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </div>
        <button className="px-[18px] py-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-md transition-colors">
          Save changes
        </button>
        <div className="flex items-center bg-gray-100 rounded-lg p-[3px] gap-0.5">
          <span className="px-3.5 py-1 rounded-md text-[12px] font-medium bg-white text-gray-900 shadow-sm">Builder</span>
          <Link href="/" className="px-3.5 py-1 rounded-md text-[12px] font-medium text-gray-500 hover:text-gray-700 no-underline">User view</Link>
        </div>
        <button className="text-gray-400 text-xl bg-none border-none cursor-pointer px-1 leading-none">···</button>
      </header>

      {/* Layout */}
      <div className="grid gap-6 p-6 mx-auto items-start" style={{ gridTemplateColumns: '1fr 300px', maxWidth: 1200 }}>

        {/* Left column */}
        <div>

          {/* Form Details card */}
          <div className="bg-white border border-gray-200 rounded-[10px] overflow-hidden mb-4">
            <div className="p-5 flex flex-col gap-3.5">
              <div className="text-[14px] font-semibold text-gray-900">Form Details</div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-gray-700">Template Name <span className="text-red-500">*</span></label>
                <input
                  className="w-full px-[11px] py-2 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-blue-300"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-[11px] py-2 border border-gray-200 rounded-md text-[13px] resize-y focus:outline-none focus:border-blue-300"
                  style={{ minHeight: 68 }}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-gray-700">Submit button text</label>
                <span className="text-[11px] text-gray-400 -mt-0.5">Shown on the button at the bottom of the form</span>
                <input
                  className="w-full px-[11px] py-2 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-blue-300"
                  value={ctaLabel}
                  onChange={e => setCtaLabel(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Fields card */}
          <div className="bg-white border border-gray-200 rounded-[10px] overflow-visible">

            {/* Fields header — sticky */}
            <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-[10px]">
              <div>
                <div className="text-[14px] font-semibold text-gray-900">Fields</div>
                <div className="text-[12px] text-gray-500 mt-0.5">Add, remove, and reorder fields for this template.</div>
              </div>
              <div className="flex items-center gap-2">
                {steps.map(step =>
                  step.sections.map(sec => (
                    <AddFieldMenu key={sec.id} onAdd={type => addField(step.id, sec.id, type)} />
                  ))
                )}
              </div>
            </div>

            {/* Field rows */}
            {steps.map(step =>
              step.sections.map(sec => (
                <div key={sec.id}>
                  {sec.fields.length === 0 && (
                    <div className="px-5 py-7 text-center text-[13px] text-gray-400">
                      No fields yet — use "Add field" to get started.
                    </div>
                  )}
                  {sec.fields.map(field => (
                    <FieldRow
                      key={field.id}
                      field={field}
                      onChange={updates => updateField(step.id, sec.id, field.id, updates)}
                      onDelete={() => deleteField(step.id, sec.id, field.id)}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Preview column — sticky */}
        <div className="sticky top-6">
          <PhonePreview steps={steps} ctaLabel={ctaLabel} formTitle={formTitle} />
        </div>

      </div>
    </div>
  )
}
