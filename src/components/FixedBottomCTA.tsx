import React from 'react'
import { MessageCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { CakeSize, CakeFlavor } from '@/data/cakeOptions'
import type { CustomizationState } from './StepCustomizations'
import type { EventDetailsState } from './StepEventDetails'
import { WHATSAPP_PHONE_NUMBER } from '@/data/cakeOptions'

interface FixedBottomCTAProps {
  totalPrice: number
  size: CakeSize
  flavor: CakeFlavor
  customizations: CustomizationState
  eventDetails: EventDetailsState
}

export const FixedBottomCTA: React.FC<FixedBottomCTAProps> = ({
  totalPrice,
  size,
  flavor,
  customizations,
  eventDetails,
}) => {
  const handleWhatsAppOrder = () => {
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
    <div className="shrink-0 w-full bg-white border-t border-stone-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-50">
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
          className="flex-1 max-w-xs sm:max-w-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] text-white py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all duration-150 cursor-pointer min-h-[48px]"
        >
          <MessageCircle className="w-5 h-5 fill-current shrink-0" />
          <span className="truncate">Order via WhatsApp</span>
        </button>
      </div>
    </div>
  )
}
