'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function SubmitPage() {
  const [ackChecked, setAckChecked] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#f4f5f7', fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif", fontSize: 14 }}>

      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 flex items-center px-6 gap-3.5" style={{ height: 54 }}>
        <Link href="/builder" className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 no-underline">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to form builder
        </Link>
        <span className="text-[17px] font-bold text-gray-900 flex-1">Physical Pass Card</span>
        <div className="flex items-center bg-gray-100 rounded-lg p-[3px] gap-0.5">
          <Link href="/builder" className="px-3.5 py-[5px] rounded-md text-[12px] font-medium text-gray-500 hover:text-gray-700 no-underline">Builder</Link>
          <span className="px-3.5 py-[5px] rounded-md text-[12px] font-medium bg-white text-gray-900 shadow-sm">User view</span>
        </div>
      </header>

      {/* Page body */}
      <div className="mx-auto pb-16" style={{ maxWidth: 600, margin: '32px auto', padding: '0 24px 60px' }}>

        {/* Request header */}
        <div className="mb-6">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Access Request</div>
          <div className="text-[22px] font-bold text-gray-900 mb-1.5">Physical Pass Card</div>
          <div className="text-[13px] text-gray-500 leading-relaxed">Submit your Physical Pass Card requests</div>
        </div>

        {/* Request Details card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide pb-2 mb-4 border-b border-gray-100">
            Request Details
          </div>

          <div className="mb-5">
            <label className="block text-[13px] font-semibold text-gray-900 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-[13px] resize-y focus:outline-none focus:border-blue-300 transition-colors"
              style={{ minHeight: 80, fontFamily: 'inherit' }}
              placeholder="Describe what you need in as much detail as possible"
              rows={3}
            />
          </div>

          <div className="mb-5">
            <label className="block text-[13px] font-semibold text-gray-900 mb-1">Location</label>
            <input
              className="w-full px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-300 transition-colors"
              style={{ fontFamily: 'inherit' }}
              placeholder="Where does this request apply?"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1">Attachment</label>
            <div
              className="border-[1.5px] border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="text-[22px] mb-1.5">📎</div>
              <div className="text-[13px] text-gray-500">Tap to upload a file</div>
              <div className="text-[11px] text-gray-400 mt-0.5">or drag and drop</div>
            </div>
            <span className="text-[12px] text-gray-400 mt-1.5 block leading-snug">All file types accepted</span>
          </div>
        </div>

        {/* Access Request Details card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide pb-2 mb-4 border-b border-gray-100">
            Access Request Details
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-900 mb-1">
              Access Areas <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-300 transition-colors"
              style={{ fontFamily: 'inherit' }}
              placeholder="Enter access areas"
            />
            <span className="text-[12px] text-gray-400 mt-1.5 block leading-snug">Provide any other areas you will need access.</span>
          </div>
        </div>

        {/* Acknowledgment card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <label
            className="flex items-start gap-2.5 cursor-pointer p-3.5 rounded-lg"
            style={{ background: '#f8faff', border: '1.5px solid #bfdbfe' }}
          >
            <input
              type="checkbox"
              className="w-4 h-4 mt-0.5 shrink-0 accent-blue-600 cursor-pointer"
              checked={ackChecked}
              onChange={e => setAckChecked(e.target.checked)}
            />
            <div>
              <div className="text-[13px] text-gray-700 leading-relaxed">
                I confirm the details of this request are accurate{' '}
                <span className="text-red-500">*</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">Please review your request details before submitting.</div>
            </div>
          </label>
        </div>

        {/* Submit */}
        <div>
          <button
            disabled={!ackChecked}
            style={{
              width: '100%',
              padding: 13,
              background: ackChecked ? '#2563eb' : '#93c5fd',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: ackChecked ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s',
              fontFamily: 'inherit',
            }}
          >
            Acknowledge and Request
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-2.5 leading-snug">
            Your request will be reviewed by the security admin team.
          </p>
        </div>

      </div>
    </div>
  )
}
