'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { FormStep, FormField } from '@/types/form'

interface FormState {
  steps: FormStep[]
  formTitle: string
  formDescription: string
  ctaLabel: string
}

const DEFAULT_STATE: FormState = {
  formTitle: 'Physical Pass Card',
  formDescription: 'Submit your Physical Pass Card requests',
  ctaLabel: 'Acknowledge and Request',
  steps: [
    {
      id: 'step-1',
      stepNum: 1,
      sections: [
        {
          id: 'section-1',
          title: 'Default',
          fields: [
            { id: 'field-description', type: 'Open text', name: 'Description', helperText: 'Describe what you need in as much detail as possible', required: true, system: true },
            { id: 'field-location', type: 'Open text', name: 'Location', helperText: 'Where does this request apply?', required: false, placeholder: '' },
            { id: 'field-attachment', type: 'File upload', name: 'Attachment', helperText: 'All file types accepted', required: false, uploadZoneText: 'Tap to upload', acceptedFileTypes: [] },
            { id: 'field-section-access', type: 'Section Header', name: 'Access Request Details', helperText: '', required: false },
            { id: 'field-access-areas', type: 'Open text', name: 'Access Areas', helperText: 'Provide any other areas you will need access.', required: true, placeholder: 'Enter access areas' },
            { id: 'field-acknowledgment', type: 'Checkbox', name: 'I confirm the details of this request are accurate', helperText: 'Please review your request details before submitting.', required: true },
          ],
        },
      ],
    },
  ],
}

export default function SubmitPage() {
  const [formState, setFormState] = useState<FormState>(DEFAULT_STATE)
  const [step, setStep] = useState(0)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('custom-form-state')
      if (saved) setFormState(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  const { steps, formTitle, formDescription, ctaLabel } = formState
  const totalSteps = steps.length
  const currentStep = steps[Math.min(step, steps.length - 1)]
  const isLastStep = step === totalSteps - 1
  const allFields = currentStep?.sections.flatMap(s => s.fields) ?? []

  // Check if all required fields on current step have a "value" — for the submit button disable state
  // We track checkbox values to gate the submit button on the last step
  const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>({})
  const requiredCheckboxes = allFields.filter(f => f.type === 'Checkbox' && f.required)
  const allRequiredChecked = requiredCheckboxes.every(f => checkboxValues[f.id])

  function toggleCheckbox(id: string) {
    setCheckboxValues(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen" style={{ background: '#f4f5f7', fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif", fontSize: 14 }}>

      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 flex items-center px-6 gap-3.5" style={{ height: 54 }}>
        <Link href="/builder" className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 no-underline">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to form builder
        </Link>
        <span className="text-[17px] font-bold text-gray-900 flex-1">{formTitle}</span>
        <div className="flex items-center bg-gray-100 rounded-lg p-[3px] gap-0.5">
          <Link href="/builder" className="px-3.5 py-[5px] rounded-md text-[12px] font-medium text-gray-500 hover:text-gray-700 no-underline">Builder</Link>
          <span className="px-3.5 py-[5px] rounded-md text-[12px] font-medium bg-white text-gray-900 shadow-sm">User view</span>
        </div>
      </header>

      <div style={{ maxWidth: 600, margin: '32px auto', padding: '0 24px 60px' }}>

        {/* Request header */}
        <div className="mb-6">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Access Request</div>
          <div className="text-[22px] font-bold text-gray-900 mb-1.5">{formTitle}</div>
          {formDescription && <div className="text-[13px] text-gray-500 leading-relaxed">{formDescription}</div>}
        </div>

        {/* Progress bar — only when multi-step */}
        {totalSteps > 1 && (
          <div className="mb-6">
            <div className="flex gap-1.5 mb-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-300"
                  style={{ height: 5, background: i <= step ? '#2563eb' : '#e5e7eb' }}
                />
              ))}
            </div>
            <div className="text-[12px] text-gray-400">Step {step + 1} of {totalSteps}</div>
          </div>
        )}

        {/* Fields */}
        <StepFields
          fields={allFields}
          checkboxValues={checkboxValues}
          onToggleCheckbox={toggleCheckbox}
        />

        {/* Navigation */}
        <div className="flex flex-col gap-2.5 mt-4">
          {!isLastStep ? (
            <button
              onClick={() => { setStep(s => s + 1); setCheckboxValues({}) }}
              style={{ width: '100%', padding: 13, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Next →
            </button>
          ) : (
            <button
              disabled={requiredCheckboxes.length > 0 && !allRequiredChecked}
              style={{
                width: '100%',
                padding: 13,
                background: (requiredCheckboxes.length === 0 || allRequiredChecked) ? '#2563eb' : '#93c5fd',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: (requiredCheckboxes.length === 0 || allRequiredChecked) ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {ctaLabel || 'Submit'}
            </button>
          )}

          {step > 0 && (
            <button
              onClick={() => { setStep(s => s - 1); setCheckboxValues({}) }}
              style={{ width: '100%', padding: 11, background: 'transparent', color: '#6b7280', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              ← Back
            </button>
          )}
        </div>

        {isLastStep && (
          <p className="text-center text-[11px] text-gray-400 mt-2.5 leading-snug">
            Your request will be reviewed by the security admin team.
          </p>
        )}
      </div>
    </div>
  )
}

function StepFields({ fields, checkboxValues, onToggleCheckbox }: {
  fields: FormField[]
  checkboxValues: Record<string, boolean>
  onToggleCheckbox: (id: string) => void
}) {
  if (fields.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-[13px] text-gray-400 text-center">
        No fields on this step yet.
      </div>
    )
  }

  // Split fields into groups: a new card starts at each Section Header
  const groups: FormField[][] = [[]]
  for (const field of fields) {
    if (field.type === 'Section Header') {
      groups.push([field])
    } else {
      groups[groups.length - 1].push(field)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {groups.filter(g => g.length > 0).map((group, gi) => {
        const header = group[0]?.type === 'Section Header' ? group[0] : null
        const bodyFields = header ? group.slice(1) : group
        return (
          <div key={gi} className="bg-white border border-gray-200 rounded-xl p-6">
            {header && (
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide pb-2 mb-4 border-b border-gray-100">
                {header.name}
              </div>
            )}
            <div className="flex flex-col gap-5">
              {bodyFields.map(field => (
                <UserField
                  key={field.id}
                  field={field}
                  checked={!!checkboxValues[field.id]}
                  onToggle={() => onToggleCheckbox(field.id)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function UserField({ field, checked, onToggle }: { field: FormField; checked: boolean; onToggle: () => void }) {
  if (field.type === 'Checkbox') {
    return (
      <label
        className="flex items-start gap-2.5 cursor-pointer p-3.5 rounded-lg"
        style={{ background: '#f8faff', border: '1.5px solid #bfdbfe' }}
      >
        <input
          type="checkbox"
          className="w-4 h-4 mt-0.5 shrink-0 accent-blue-600 cursor-pointer"
          checked={checked}
          onChange={onToggle}
        />
        <div>
          <div
            className="text-[13px] text-gray-700 leading-relaxed rich-text-content"
            dangerouslySetInnerHTML={{ __html: field.name + (field.required ? '<span class="text-red-500"> *</span>' : '') }}
          />
          {field.helperText && <div className="text-[11px] text-gray-400 mt-0.5 rich-text-content" dangerouslySetInnerHTML={{ __html: field.helperText }} />}
        </div>
      </label>
    )
  }

  if (field.type === 'File upload') {
    return (
      <div>
        <label className="block text-[13px] font-semibold text-gray-900 mb-1">
          {field.name}{field.required && <span className="text-red-500"> *</span>}
        </label>
        <div className="border-[1.5px] border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
          <div className="text-[22px] mb-1.5">📎</div>
          <div className="text-[13px] text-gray-500">{field.uploadZoneText || 'Tap to upload a file'}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">or drag and drop</div>
        </div>
        {field.helperText && <span className="text-[12px] text-gray-400 mt-1.5 block leading-snug">{field.helperText}</span>}
      </div>
    )
  }

  if (field.type === 'Multiple choice' || field.type === 'Multi-select') {
    const isRadio = field.type === 'Multiple choice'
    return (
      <div>
        <label className="block text-[13px] font-semibold text-gray-900 mb-2">
          {field.name}{field.required && <span className="text-red-500"> *</span>}
        </label>
        <div className="flex flex-col gap-2">
          {(field.options ?? []).map((opt, i) => (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer text-[13px] text-gray-700">
              <input type={isRadio ? 'radio' : 'checkbox'} name={field.id} className="accent-blue-600" />
              {opt}
            </label>
          ))}
        </div>
        {field.helperText && <div className="text-[12px] text-gray-400 mt-1.5">{field.helperText}</div>}
      </div>
    )
  }

  const inputType = field.type === 'Number' ? 'number' : field.type === 'Phone' ? 'tel' : field.type === 'Date' ? 'date' : 'text'
  const isMultiline = field.type === 'Open text'

  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-900 mb-1">
        {field.name}{field.required && <span className="text-red-500"> *</span>}
      </label>
      {isMultiline ? (
        <textarea
          className="w-full px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-[13px] resize-y focus:outline-none focus:border-blue-300 transition-colors"
          style={{ minHeight: 80, fontFamily: 'inherit' }}
          placeholder={field.placeholder || field.helperText || `Enter ${field.name.toLowerCase()}`}
          rows={3}
        />
      ) : (
        <input
          type={inputType}
          className="w-full px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-300 transition-colors"
          style={{ fontFamily: 'inherit' }}
          placeholder={field.placeholder || field.helperText || `Enter ${field.name.toLowerCase()}`}
        />
      )}
      {field.helperText && field.type !== 'Open text' && (
        <span className="text-[12px] text-gray-400 mt-1.5 block leading-snug">{field.helperText}</span>
      )}
    </div>
  )
}
