export type FieldType =
  | 'Open text'
  | 'Number'
  | 'Date'
  | 'Phone'
  | 'Multiple choice'
  | 'Multi-select'
  | 'File upload'
  | 'Checkbox'
  | 'Section Header'

export interface FormField {
  id: string
  type: FieldType
  name: string
  helperText: string
  required: boolean
  system?: boolean  // system fields cannot be deleted
  // Open text / Number / Phone / Date
  placeholder?: string
  // Number
  minValue?: number
  maxValue?: number
  // Open text
  minChars?: number
  maxChars?: number
  // Multiple choice / Multi-select
  options?: string[]
  // File upload
  uploadZoneText?: string
  acceptedFileTypes?: string[]
  // Date
  weekdaysOnly?: boolean
  weekendsOnly?: boolean
  // Section Header (no extra fields — name is the heading)
}

export interface FormSection {
  id: string
  title: string
  fields: FormField[]
}

export interface FormStep {
  id: string
  stepNum: number
  sections: FormSection[]
}

export const FILE_TYPE_OPTIONS = [
  'Images (JPG, PNG, GIF, WebP)',
  'PDF',
  'Word documents (.doc, .docx)',
  'Spreadsheets (.xls, .xlsx)',
  'Videos (.mp4, .mov)',
] as const

export const HELPER_SUGGESTIONS: Record<FieldType, string> = {
  'Open text':       'Please provide as much detail as possible',
  'Multiple choice': 'Select one option',
  'Multi-select':    'Select all that apply',
  'Number':          'Enter a number',
  'Date':            'Enter a date',
  'Phone':           'Enter a phone number including area code',
  'File upload':     'Upload any relevant photos or documents',
  'Checkbox':        '',
  'Section Header':  '',
}
