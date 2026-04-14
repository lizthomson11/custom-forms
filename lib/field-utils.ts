import { FormField, FieldType, HELPER_SUGGESTIONS, FILE_TYPE_OPTIONS } from '@/types/form'

let counter = 0
export function newId() {
  return `field-${Date.now()}-${counter++}`
}

export function createField(type: FieldType): FormField {
  const base: FormField = {
    id: newId(),
    type,
    name: type,
    helperText: HELPER_SUGGESTIONS[type] ?? '',
    required: false,
  }

  if (type === 'Multiple choice' || type === 'Multi-select') {
    return { ...base, options: ['Option 1', 'Option 2'] }
  }
  if (type === 'File upload') {
    return {
      ...base,
      uploadZoneText: 'Tap to upload',
      acceptedFileTypes: [...FILE_TYPE_OPTIONS],
    }
  }
  if (type === 'Phone') {
    return { ...base, placeholder: '+1 (555) 000-0000' }
  }
  if (type === 'Date') {
    return { ...base, placeholder: 'MM/DD/YYYY' }
  }
  return base
}

export function getFileTypesLabel(types: string[]): string {
  const short: Record<string, string> = {
    'Images (JPG, PNG, GIF, WebP)': 'Images',
    'PDF': 'PDF',
    'Word documents (.doc, .docx)': 'Documents',
    'Spreadsheets (.xls, .xlsx)': 'Spreadsheets',
    'Videos (.mp4, .mov)': 'Videos',
  }
  if (types.length === FILE_TYPE_OPTIONS.length) return 'All file types accepted'
  if (types.length === 0) return ''
  return 'Upload ' + types.map(t => short[t] ?? t).join(', ')
}
