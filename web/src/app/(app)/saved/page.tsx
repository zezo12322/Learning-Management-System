import { Bookmark } from 'lucide-react'

export default function SavedPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-title-md font-bold text-content">الدورات المحفوظة</h1>
      <div className="flex flex-col items-center gap-3 py-20 text-center text-content-secondary">
        <Bookmark size={40} />
        <p>لا توجد دورات محفوظة بعد.</p>
        <p className="text-xs">قريباً — حفظ الدورات المفضّلة لديك.</p>
      </div>
    </div>
  )
}
