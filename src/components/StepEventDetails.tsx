import React, { useRef } from 'react'
import {
  UploadCloud,
  X,
  Calendar,
  Clock,
  MapPin,
  Store,
  FileImage,
  Info
} from 'lucide-react'
import { TIME_SLOTS } from '@/data/cakeOptions'

export interface EventDetailsState {
  photoPreview: string | null
  photoName: string | null
  eventDate: string
  timeSlot: string
  orderType: 'delivery' | 'pickup'
  deliveryAddress: string
  cakeMessage: string
  specialNotes: string
}

interface StepEventDetailsProps {
  details: EventDetailsState
  onChange: (patch: Partial<EventDetailsState>) => void
}

export const StepEventDetails: React.FC<StepEventDetailsProps> = ({
  details,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image under 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange({
          photoPreview: reader.result as string,
          photoName: file.name,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange({ photoPreview: null, photoName: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Minimum date today
  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold shadow-xs">
              4
            </span>
            Design Inspiration & Event Details
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Share your reference visual & schedule pickup or delivery
          </p>
        </div>
      </div>

      {/* Reference Image Upload */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          Reference Design Photo (Optional)
        </label>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {details.photoPreview ? (
          <div className="relative rounded-2xl border-2 border-rose-300 bg-rose-50/30 p-3 flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={details.photoPreview}
                alt="Inspiration Preview"
                className="w-16 h-16 object-cover rounded-xl border border-stone-200 shadow-xs"
              />
              <div className="truncate">
                <p className="text-xs font-semibold text-stone-800 truncate">
                  {details.photoName || 'Inspiration Design'}
                </p>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <FileImage className="w-3 h-3" /> Image attached successfully
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-rose-600 font-semibold hover:underline mt-1 cursor-pointer"
                >
                  Change image
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={removePhoto}
              className="p-1.5 rounded-full bg-white text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 shadow-xs transition-colors cursor-pointer"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-stone-300 hover:border-rose-400 rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-rose-50/30"
          >
            <div className="mx-auto w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-800">
              Upload Cake Reference / Theme Photo
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Tap to browse from your gallery or camera (PNG, JPG up to 5MB)
            </p>
          </div>
        )}
      </div>

      {/* Date & Time Slot in Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-rose-600" />
            Event Date *
          </label>
          <input
            type="date"
            min={todayStr}
            value={details.eventDate}
            onChange={(e) => onChange({ eventDate: e.target.value })}
            className="w-full text-sm bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-500 transition-shadow font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-600" />
            Time Slot *
          </label>
          <select
            value={details.timeSlot}
            onChange={(e) => onChange({ timeSlot: e.target.value })}
            className="w-full text-sm bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-500 transition-shadow font-medium cursor-pointer"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delivery / Pickup Radio Toggle */}
      <div>
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
          Fulfillment Preference *
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ orderType: 'pickup' })}
            className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
              details.orderType === 'pickup'
                ? 'border-rose-500 bg-rose-50/70 font-semibold text-stone-900 shadow-xs'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                details.orderType === 'pickup' ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-500'
              }`}
            >
              <Store className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">Self Pick-up</p>
              <p className="text-[10px] text-stone-500">From Studio (Free)</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ orderType: 'delivery' })}
            className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
              details.orderType === 'delivery'
                ? 'border-rose-500 bg-rose-50/70 font-semibold text-stone-900 shadow-xs'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                details.orderType === 'delivery' ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-500'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">Home Delivery</p>
              <p className="text-[10px] text-stone-500">Cab / Porter at actuals</p>
            </div>
          </button>
        </div>

        {details.orderType === 'delivery' && (
          <div className="mt-3">
            <textarea
              placeholder="Enter complete delivery address & landmark..."
              rows={2}
              value={details.deliveryAddress}
              onChange={(e) => onChange({ deliveryAddress: e.target.value })}
              className="w-full text-xs sm:text-sm bg-white border border-stone-300 rounded-xl p-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-500 transition-shadow"
            />
          </div>
        )}
      </div>

      {/* Message on Cake & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Piped Message on Cake (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Happy 25th Birthday Rhea!"
            maxLength={40}
            value={details.cakeMessage}
            onChange={(e) => onChange({ cakeMessage: e.target.value })}
            className="w-full text-sm bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-500 transition-shadow"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Special Flavor / Dietary Note (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Less sweet, extra cocoa dusting"
            maxLength={60}
            value={details.specialNotes}
            onChange={(e) => onChange({ specialNotes: e.target.value })}
            className="w-full text-sm bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-500 transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-start gap-2 text-[11px] text-stone-500 bg-stone-100/80 p-2.5 rounded-xl">
        <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
        <span>
          If you have uploaded a reference photo, don't worry! You can also easily attach or share the original high-res image directly in the WhatsApp chat window once the order link opens.
        </span>
      </div>
    </div>
  )
}
