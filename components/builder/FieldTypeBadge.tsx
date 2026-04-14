import { FieldType } from '@/types/form'
import { Badge } from '@/components/ui/badge'

export function FieldTypeBadge({ type }: { type: FieldType }) {
  return (
    <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 font-semibold text-[11px] shrink-0">
      {type}
    </Badge>
  )
}
