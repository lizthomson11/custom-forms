'use client'

import { FormField, TargetingRule, TargetingAudience, TargetingPermission } from '@/types/form'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

const DEFAULT_RULE: TargetingRule = {
  permission: 'write',
  audience: 'all-users',
}

function Select<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  const [open, setOpen] = useState(false)
  const label = options.find(o => o.value === value)?.label ?? value

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-md hover:border-gray-300 transition-colors w-[140px]"
        onClick={() => setOpen(o => !o)}
      >
        {label}
        <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-gray-200 rounded-md shadow-md py-1 min-w-[140px]">
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-50 transition-colors flex items-center justify-between gap-4 ${opt.value === value ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                onClick={() => { onChange(opt.value); setOpen(false) }}
              >
                {opt.label}
                {opt.value === value && <span className="text-blue-600">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function RuleRow({
  rule,
  onChange,
  onDelete,
  canDelete,
}: {
  rule: TargetingRule
  onChange: (r: TargetingRule) => void
  onDelete: () => void
  canDelete: boolean
}) {
  function update<K extends keyof TargetingRule>(key: K, val: TargetingRule[K]) {
    onChange({ ...rule, [key]: val })
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 flex-wrap">
        <Select<TargetingPermission>
          value={rule.permission}
          options={[
            { value: 'write', label: 'Write' },
            { value: 'read', label: 'Read' },
          ]}
          onChange={v => update('permission', v)}
        />
        <span className="text-[12px] text-gray-500">for</span>
        <Select<TargetingAudience>
          value={rule.audience}
          options={[
            { value: 'all-users', label: 'All users' },
            { value: 'specific-users', label: 'Specific users' },
            { value: 'specific-roles', label: 'Specific roles' },
          ]}
          onChange={v => update('audience', v)}
        />
        {canDelete && (
          <button
            type="button"
            className="text-gray-300 hover:text-red-400 transition-colors ml-auto"
            onClick={onDelete}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {(rule.audience === 'specific-users' || rule.audience === 'specific-roles') && (
        <input
          className="w-full px-[11px] py-1.5 border border-gray-200 rounded-md text-[12px] text-gray-900 bg-white focus:outline-none focus:border-blue-300"
          style={{ fontFamily: 'inherit' }}
          placeholder={rule.audience === 'specific-users' ? 'Enter user names, separated by commas…' : 'Enter role names, separated by commas…'}
          value={rule.values?.join(', ') ?? ''}
          onChange={e => update('values', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
        />
      )}
    </div>
  )
}

export function FieldTargeting({ field, onChange }: Props) {
  const rules: TargetingRule[] = field.targeting ?? [{ ...DEFAULT_RULE }]

  function updateRule(index: number, updated: TargetingRule) {
    onChange({ targeting: rules.map((r, i) => i === index ? updated : r) })
  }

  function addRule() {
    onChange({ targeting: [...rules, { ...DEFAULT_RULE }] })
  }

  function deleteRule(index: number) {
    const next = rules.filter((_, i) => i !== index)
    onChange({ targeting: next.length ? next : [{ ...DEFAULT_RULE }] })
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-gray-700">Targeting</p>
      <p className="text-[11px] text-gray-400 -mt-1">Control who can read or write this field</p>

      {rules.map((rule, i) => (
        <RuleRow
          key={i}
          rule={rule}
          onChange={r => updateRule(i, r)}
          onDelete={() => deleteRule(i)}
          canDelete={rules.length > 1}
        />
      ))}

      <button
        type="button"
        className="flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors w-fit"
        onClick={addRule}
      >
        <Plus className="w-3.5 h-3.5" />
        Add rule
      </button>
    </div>
  )
}

interface Props {
  field: FormField
  onChange: (updates: Partial<FormField>) => void
}
