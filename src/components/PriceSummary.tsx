import React, { useState } from 'react'
import {
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import type { CakeSize, CakeFlavor } from '@/data/cakeOptions'
import type { CustomizationState } from './StepCustomizations'

interface PriceSummaryProps {
  size: CakeSize
  flavor: CakeFlavor
  customizations: CustomizationState
  totalPrice: number
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  size,
  flavor,
  customizations,
  totalPrice,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-stone-50/70 rounded-2xl border border-stone-200/90 shadow-2xs p-3.5 sm:p-5">
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
        <div className="flex items-center gap-1 text-[11px] sm:text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">
          <span>{isExpanded ? 'Hide' : 'View'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-3.5 pt-3.5 border-t border-stone-200/80 space-y-2.5 text-xs sm:text-sm">
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
      <div className="mt-3 bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 flex items-start gap-2 text-stone-700">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-snug">
          <strong className="text-amber-800">Estimated price.</strong> Final
          quote confirmed upon design review. Intricate fondant sculptures or
          seasonal fresh fruit toppers may require minor adjustments.
        </p>
      </div>
    </div>
  )
}
