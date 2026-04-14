import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'

export default function ListPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f4f5f7', fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif", fontSize: 14 }}>
      <div className="grid gap-6 p-6 mx-auto items-start" style={{ gridTemplateColumns: '1fr 300px', maxWidth: 1200 }}>

        {/* Left column */}
        <div>
          {/* Page header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[20px] font-bold text-gray-900">Request forms</div>
              <div className="text-[13px] text-gray-500 mt-1">
                Select a card below to preview the form. The default form applies to any categories and types not assigned to a custom template.
              </div>
            </div>
            <Link
              href="/new"
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors no-underline whitespace-nowrap ml-4"
            >
              <Plus className="w-3 h-3" />
              Create template
            </Link>
          </div>

          {/* Template card */}
          <Link
            href="/builder"
            className="bg-white border border-gray-200 rounded-[10px] px-5 py-4 flex items-center gap-3.5 cursor-pointer no-underline text-inherit hover:border-blue-300 transition-colors"
          >
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-gray-900">Physical Pass Card</div>
              <div className="text-[13px] text-gray-500 mt-0.5">Submit your Physical Pass Card requests</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[12px] font-medium bg-blue-50 text-blue-600 border border-blue-200">3 fields</span>
              <span className="px-2.5 py-0.5 rounded-md text-[12px] font-medium bg-orange-50 text-orange-600 border border-orange-200">Not applied</span>
            </div>
            <Pencil className="w-4 h-4 text-gray-400 shrink-0" />
          </Link>
        </div>

        {/* Phone preview */}
        <div className="sticky top-6">
          <div
            className="mx-auto bg-white flex items-center justify-center"
            style={{
              width: 258,
              height: 518,
              border: '2.5px solid #1a1d23',
              borderRadius: 34,
              boxShadow: '0 6px 28px rgba(0,0,0,0.12)',
            }}
          >
            <p className="text-[12px] text-gray-400 text-center px-5 leading-relaxed">
              Select a template to preview
            </p>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-2.5 leading-snug">
            This preview shows how the form<br />will appear to users on mobile.
          </p>
        </div>

      </div>
    </div>
  )
}
