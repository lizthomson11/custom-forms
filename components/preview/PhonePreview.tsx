import { FormField, FormStep } from '@/types/form'

interface Props {
  steps: FormStep[]
  ctaLabel: string
  formTitle: string
}

export function PhonePreview({ steps, ctaLabel, formTitle }: Props) {
  const allFields = steps.flatMap(s => s.sections.flatMap(sec => sec.fields))

  return (
    <div className="w-[260px] rounded-[32px] border-[6px] border-gray-800 bg-white shadow-xl overflow-hidden shrink-0">
      {/* Status bar */}
      <div className="bg-gray-800 flex justify-between items-center px-4 py-1">
        <span className="text-white text-[10px]">9:41</span>
        <span className="text-white text-[10px]">●●●</span>
      </div>

      {/* App chrome */}
      <div className="bg-blue-600 px-3 py-2">
        <p className="text-white font-semibold text-[11px] truncate">{formTitle || 'Form preview'}</p>
      </div>

      {/* Scrollable form */}
      <div className="overflow-y-auto max-h-[520px] px-3 py-3 space-y-1">
        {allFields.length === 0 && (
          <p className="text-[11px] text-gray-400 text-center py-8">Add fields to see a preview</p>
        )}
        {allFields.map(field => (
          <PreviewField key={field.id} field={field} />
        ))}

        {allFields.length > 0 && (
          <button className="w-full mt-3 bg-blue-600 text-white text-[11px] font-semibold py-2 rounded-lg">
            {ctaLabel || 'Submit'}
          </button>
        )}
      </div>
    </div>
  )
}

function PreviewField({ field }: { field: FormField }) {
  if (field.type === 'Section Header') {
    return (
      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide pt-3 pb-1 border-b border-gray-100">
        {field.name || 'Section'}
      </div>
    )
  }

  if (field.type === 'Checkbox') {
    return (
      <div className="mb-3">
        <label className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded cursor-pointer">
          <input type="checkbox" className="accent-blue-600 w-3 h-3 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-semibold text-gray-900">
              {field.name}{field.required && <span className="text-red-500 ml-0.5">*</span>}
            </div>
            {field.helperText && (
              <div className="text-[9px] text-gray-400 mt-0.5">{field.helperText}</div>
            )}
          </div>
        </label>
      </div>
    )
  }

  if (field.type === 'Multiple choice' || field.type === 'Multi-select') {
    const shape = field.type === 'Multiple choice' ? 'rounded-full' : 'rounded-sm'
    return (
      <div className="mb-3">
        <div className="text-[10px] font-semibold text-gray-900 mb-1">
          {field.name}{field.required && <span className="text-red-500 ml-0.5">*</span>}
        </div>
        <div className="space-y-0.5">
          {(field.options ?? []).slice(0, 4).map((opt, i) => (
            <label key={i} className="flex items-center gap-1.5 text-[10px] text-gray-700 py-0.5">
              <span className={`w-2.5 h-2.5 border-[1.5px] border-gray-300 inline-block bg-white shrink-0 ${shape}`} />
              {opt}
            </label>
          ))}
        </div>
        {field.helperText && (
          <div className="text-[9px] text-gray-400 mt-1">{field.helperText}</div>
        )}
      </div>
    )
  }

  if (field.type === 'File upload') {
    return (
      <div className="mb-3">
        <div className="text-[10px] font-semibold text-gray-900 mb-1">
          {field.name}{field.required && <span className="text-red-500 ml-0.5">*</span>}
        </div>
        <div className="border-[1.5px] border-dashed border-gray-300 rounded text-center py-2 text-[9px] text-gray-400">
          {field.uploadZoneText || 'Tap to upload'}
        </div>
        {field.helperText && (
          <div className="text-[9px] text-gray-400 mt-1">{field.helperText}</div>
        )}
      </div>
    )
  }

  // Default: text-like inputs
  const placeholder = field.placeholder
    ?? (field.type === 'Date' ? 'MM/DD/YYYY'
      : field.type === 'Phone' ? '+1 (555) 000-0000'
      : `Enter ${(field.name || 'response').toLowerCase()}`)

  return (
    <div className="mb-3">
      <div className="text-[10px] font-semibold text-gray-900 mb-1">
        {field.name}{field.required && <span className="text-red-500 ml-0.5">*</span>}
      </div>
      <div className="border border-gray-200 rounded px-2 py-1.5 text-[10px] text-gray-400">
        {placeholder}
      </div>
      {field.helperText && (
        <div className="text-[9px] text-gray-400 mt-1">{field.helperText}</div>
      )}
    </div>
  )
}
