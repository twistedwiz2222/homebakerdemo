import React from 'react'
import { Leaf, Wand2, Layers, Check } from 'lucide-react'
import { CUSTOMIZATIONS } from '@/data/cakeOptions'

export interface CustomizationState {
  eggless: boolean
  extraFrosting: boolean
  multiTier: boolean
}

interface StepCustomizationsProps {
  customizations: CustomizationState
  onToggle: (key: keyof CustomizationState) => void
}

export const StepCustomizations: React.FC<StepCustomizationsProps> = ({
  customizations,
  onToggle,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-emerald-600" />
      case 'Wand2':
        return <Wand2 className="w-4 h-4 text-purple-600" />
      case 'Layers':
        return <Layers className="w-4 h-4 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold shadow-xs">
              3
            </span>
            Customization Toggles & Add-ons
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Dietary requirements and decorative artistic upgrades
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {CUSTOMIZATIONS.map((item) => {
          const isChecked = customizations[item.id]
          return (
            <div
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                isChecked
                  ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                  : 'border-stone-200/90 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2 rounded-xl mt-0.5 flex items-center justify-center ${
                    isChecked ? 'bg-white shadow-xs' : 'bg-stone-100'
                  }`}
                >
                  {getIcon(item.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm sm:text-base text-stone-900">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 max-w-md">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold text-stone-900">
                  +₹{item.price}
                </span>

                {/* iOS style toggle switch */}
                <div
                  className={`w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 flex items-center ${
                    isChecked ? 'bg-rose-600' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                      isChecked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    {isChecked && <Check className="w-2.5 h-2.5 text-rose-600 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
