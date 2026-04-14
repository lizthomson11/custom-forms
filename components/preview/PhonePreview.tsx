import { FormField, FormStep } from '@/types/form'

interface Props {
  steps: FormStep[]
  ctaLabel: string
  formTitle: string
}

export function PhonePreview({ steps, ctaLabel, formTitle }: Props) {
  const allFields = steps.flatMap(s => s.sections.flatMap(sec => sec.fields))

  return (
    <div>
      <div
        className="mx-auto bg-white overflow-hidden"
        style={{
          width: 258,
          height: 518,
          border: '2.5px solid #1a1d23',
          borderRadius: 34,
          boxShadow: '0 6px 28px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status bar */}
        <div style={{ background: '#1a1d23', padding: '6px 16px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: 9 }}>9:41</span>
          <span style={{ color: '#fff', fontSize: 9 }}>●●●</span>
        </div>

        {/* App chrome */}
        <div style={{ background: '#2563eb', padding: '6px 12px', flexShrink: 0 }}>
          <p style={{ color: '#fff', fontWeight: 600, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {formTitle || 'Form preview'}
          </p>
        </div>

        {/* Scrollable form body — zoom scales all content to phone size */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
        <div style={{ zoom: 0.7, padding: '12px 14px' }}>
          {allFields.length === 0 && (
            <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', padding: '20px 0', lineHeight: 1.5 }}>
              Add fields to see a preview
            </p>
          )}
          {allFields.map(field => (
            <PreviewField key={field.id} field={field} />
          ))}
          {allFields.length > 0 && (
            <button style={{
              width: '100%', marginTop: 8, background: '#2563eb', color: '#fff',
              fontSize: 11, fontWeight: 600, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer'
            }}>
              {ctaLabel || 'Submit'}
            </button>
          )}
        </div>
        </div>
      </div>
      <p className="text-center text-[11px] text-gray-400 mt-2.5 leading-snug">
        Live preview — updates as you edit
      </p>
    </div>
  )
}

function PreviewField({ field }: { field: FormField }) {
  if (field.type === 'Section Header') {
    return (
      <div style={{ fontSize: 9, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '12px 0 5px', paddingBottom: 4, borderBottom: '1px solid #f3f4f6' }}>
        {field.name || 'Section'}
      </div>
    )
  }

  if (field.type === 'Checkbox') {
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 7, padding: '6px 8px', background: '#f8faff', border: '1px solid #bfdbfe', borderRadius: 4, cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: '#2563eb', width: 12, height: 12, flexShrink: 0, marginTop: 1 }} readOnly />
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#111827' }}>
              {field.name}{field.required && <span style={{ color: '#ef4444' }}> *</span>}
            </div>
            {field.helperText && <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>{field.helperText}</div>}
          </div>
        </label>
      </div>
    )
  }

  if (field.type === 'Multiple choice' || field.type === 'Multi-select') {
    const isRound = field.type === 'Multiple choice'
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
          {field.name}{field.required && <span style={{ color: '#ef4444' }}> *</span>}
        </div>
        {(field.options ?? []).slice(0, 4).map((opt, i) => (
          <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#374151', padding: '2px 0' }}>
            <span style={{ width: 11, height: 11, borderRadius: isRound ? '50%' : 2, border: '1.5px solid #d1d5db', display: 'inline-block', background: '#fff', flexShrink: 0 }} />
            {opt}
          </label>
        ))}
        {field.helperText && <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 3 }}>{field.helperText}</div>}
      </div>
    )
  }

  if (field.type === 'File upload') {
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
          {field.name}{field.required && <span style={{ color: '#ef4444' }}> *</span>}
        </div>
        <div style={{ border: '1.5px dashed #d1d5db', borderRadius: 4, padding: 7, textAlign: 'center', fontSize: 9, color: '#9ca3af' }}>
          {field.uploadZoneText || 'Tap to upload'}
        </div>
        {field.helperText && <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 3 }}>{field.helperText}</div>}
      </div>
    )
  }

  const placeholder = field.placeholder
    ?? (field.type === 'Date' ? 'MM/DD/YYYY'
      : field.type === 'Phone' ? '+1 (555) 000-0000'
      : `Enter ${(field.name || 'response').toLowerCase()}`)

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
        {field.name}{field.required && <span style={{ color: '#ef4444' }}> *</span>}
      </div>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 4, padding: '5px 7px', fontSize: 10, color: '#9ca3af' }}>
        {placeholder}
      </div>
      {field.helperText && <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 3 }}>{field.helperText}</div>}
    </div>
  )
}
