'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SubmitPage() {
  const [ackChecked, setAckChecked] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <span className="font-semibold text-gray-900 text-sm">Physical Pass Card Request</span>
        <nav className="flex items-center gap-1 ml-auto">
          <Link
            href="/builder"
            className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Builder
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-50 text-blue-600 border border-blue-200"
          >
            User view
          </Link>
        </nav>
      </header>

      <main className="max-w-xl mx-auto py-8 px-4 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
          <h1 className="text-lg font-bold text-gray-900">Physical Pass Card Request</h1>

          <div className="flex flex-col gap-1">
            <Label>Description <span className="text-red-500">*</span></Label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe what you need in as much detail as possible"
            />
            <p className="text-xs text-gray-400 mt-1">Describe what you need in as much detail as possible</p>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Location</Label>
            <Input placeholder="Where does this request apply?" />
            <p className="text-xs text-gray-400 mt-1">Where does this request apply?</p>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Attachment</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
              <div className="text-2xl mb-1">📎</div>
              <p className="text-sm text-gray-400">Tap to upload a file</p>
              <p className="text-xs text-gray-300">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-400 mt-1">All file types accepted</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Access Request Details</h2>

          <div className="flex flex-col gap-1">
            <Label>Access Areas <span className="text-red-500">*</span></Label>
            <Input placeholder="Enter access areas" />
            <p className="text-xs text-gray-400 mt-1">Provide any other areas you will need access.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="accent-blue-600 w-4 h-4 mt-0.5 shrink-0"
              checked={ackChecked}
              onChange={e => setAckChecked(e.target.checked)}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                I confirm the details of this request are accurate{' '}
                <span className="text-red-500">*</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Please review your request details before submitting.</p>
            </div>
          </label>
        </div>

        <button
          disabled={!ackChecked}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
            ackChecked
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-blue-300 text-white cursor-not-allowed opacity-60'
          }`}
        >
          Acknowledge and Request
        </button>
      </main>
    </div>
  )
}
