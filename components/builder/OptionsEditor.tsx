'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

interface Props {
  options: string[]
  onChange: (options: string[]) => void
}

export function OptionsEditor({ options, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            className="h-8 text-xs flex-1"
            value={opt}
            placeholder={`Option ${i + 1}`}
            onChange={e => {
              const next = [...options]
              next[i] = e.target.value
              onChange(next)
            }}
          />
          <button
            onClick={() => onChange(options.filter((_, j) => j !== i))}
            className="text-gray-300 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="self-start text-xs text-blue-600 hover:text-blue-700 px-0 h-7 mt-1"
        onClick={() => onChange([...options, ''])}
      >
        <Plus className="w-3 h-3 mr-1" /> Add option
      </Button>
    </div>
  )
}
