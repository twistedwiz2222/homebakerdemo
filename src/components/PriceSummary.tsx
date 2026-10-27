import { useState } from 'react'
import {
  MessageCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import type { CakeSize, CakeFlavor } from '@/data/cakeOptions'
import type { CustomizationState } from './StepCustomizations'
import type { EventDetailsState } from './StepEventDetails'
import { WHATSAPP_PHONE_NUMBER } from '@/data/cakeOptions'

interface PriceSummaryProps {
  size: CakeSize
  flavor: CakeFlavor
  customizations: CustomizationState
  eventDetails: EventDetailsState
  totalPrice: number
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  size,
  flavor,
  customizations,
  eventDetails,
  totalPrice,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Build clean WhatsApp message
  const handleWhatsAppOrder = () => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.85 },
      })
    } catch {
      // ignore
    }

    const lines: string[] = []
    lines.push('✨ *NEW CUSTOM CAKE ENQUIRY* ✨')
    lines.push('Hi! I just customized my dream cake via your online builder. Here are the details:')
    lines.push('')
    lines.push(`🎂 *Weight/Size:* ${size.label} (${size.servings}) — ₹${size.basePrice}`)
    lines.push(
      `🍫 *Flavor:* ${flavor.name} ${
        flavor.extraPrice > 0 ? `(+₹${flavor.extraPrice})` : '(Included)'
      }`
    )

    const selectedAddons: string[] = []
    if (customizations.eggless) selectedAddons.push('• 100% Eggless (+₹100)')
    if (customizations.extraFrosting)
      selectedAddons.push('• Extra Frosting / Fondant Details (+₹250)')
    if (customizations.multiTier)
      selectedAddons.push('• Multi-Tier Structure (+₹400)')

    if (selectedAddons.length > 0) {
      lines.push('')
      lines.push('*Custom Add-ons:*')
      selectedAddons.forEach((item) => lines.push(item))
    }

    lines.push('')
    lines.push('*Event & Delivery:*')
    lines.push(`📅 *Date:* ${eventDetails.eventDate || 'To be confirmed'}`)
    lines.push(`⏰ *Time Slot:* ${eventDetails.timeSlot}`)
    lines.push(
      `📦 *Preference:* ${
        eventDetails.orderType === 'delivery'
          ? `Home Delivery (${eventDetails.deliveryAddress || 'Address to follow in chat'})`
          : 'Self Pick-up from Studio'
      }`
    )

    if (eventDetails.cakeMessage.trim()) {
      lines.push(`✍️ *Cake Inscription:* "${eventDetails.cakeMessage.trim()}"`)
    }

    if (eventDetails.specialNotes.trim()) {
      lines.push(`📝 *Special Notes:* ${eventDetails.specialNotes.trim()}`)
    }

    if (eventDetails.photoPreview) {
      lines.push('📷 *Design Reference:* (Attaching the reference image in this chat)')
    }

    lines.push('')
    lines.push(`💰 *Total Estimated Price:* ₹${totalPrice.toLocaleString('en-IN')}`)
    lines.push('')
    lines.push('Please confirm availability and share final payment details!')

    const fullMessage = lines.join('\n')
    const encodedMessage = encodeURIComponent(fullMessage)
    const waUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`

    window.open(waUrl, '_blank')
  }

  return (
    <>
      {/* Detailed breakdown expandable card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-3.5 sm:p-5 mb-2">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left cursor-pointer group py-1 select-none"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
            <h3 className="text-xs sm:text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
              Live Order Estimate Breakdown
            </h3>
          </div>
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full">
            <span>{isExpanded ? 'Hide' : 'View'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="mt-3.5 pt-3.5 border-t border-stone-100 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-stone-600">
              <span>
                Cake Base ({size.label} • {size.servings})
              </span>
              <span className="font-semibold text-stone-800">
                ₹{size.basePrice}
              </span>
            </div>

            <div className="flex justify-between items-center text-stone-600">
              <span>Flavor: {flavor.name}</span>
              <span className="font-semibold text-stone-800">
                {flavor.extraPrice > 0 ? `+₹${flavor.extraPrice}` : 'Included'}
              </span>
            </div>

            {customizations.eggless && (
              <div className="flex justify-between items-center text-stone-600">
                <span>100% Eggless Preparation</span>
                <span className="font-semibold text-stone-800">+₹100</span>
              </div>
            )}

            {customizations.extraFrosting && (
              <div className="flex justify-between items-center text-stone-600">
                <span>Extra Frosting & Fondant Art</span>
                <span className="font-semibold text-stone-800">+₹250</span>
              </div>
            )}

            {customizations.multiTier && (
              <div className="flex justify-between items-center text-stone-600">
                <span>Multi-Tier Cake Structural Setup</span>
                <span className="font-semibold text-stone-800">+₹400</span>
              </div>
            )}

            <div className="pt-2.5 border-t border-dashed border-stone-200 flex justify-between items-center font-bold text-stone-900 text-sm sm:text-base">
              <span>Total Estimated</span>
              <span className="text-rose-600 text-base sm:text-lg">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* Disclaimer Badge */}
        <div className="mt-3 bg-amber-50/80 border border-amber-200/70 rounded-xl p-2.5 flex items-start gap-2 text-stone-700">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-snug">
            <strong className="text-amber-800">Estimated price.</strong> Final
            quote confirmed upon design review. Intricate fondant sculptures or
            seasonal fresh fruit toppers may require minor adjustments.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Bar with safe-area for mobile notch/navigation home indicator */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:py-3.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
              Estimated Total
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-none">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-stone-400 font-medium hidden xs:inline">
                (incl. taxes)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="flex-1 max-w-xs sm:max-w-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] text-white py-3 sm:py-3.5 px-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all duration-150 cursor-pointer min-h-[46px]"
          >
            <MessageCircle className="w-5 h-5 fill-current shrink-0" />
            <span className="truncate">Order via WhatsApp</span>
          </button>
        </div>
      </div>
    </>
  )
}
