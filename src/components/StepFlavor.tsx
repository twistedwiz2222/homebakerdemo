import React from 'react'
import { Sparkles, Coffee, Heart, Flame, Check } from 'lucide-react'
import type { CakeFlavor } from '@/data/cakeOptions'
import { CAKE_FLAVORS } from '@/data/cakeOptions'

interface StepFlavorProps {
  selectedFlavor: CakeFlavor
  onSelectFlavor: (flavor: CakeFlavor) => void
}

export const StepFlavor: React.FC<StepFlavorProps> = ({ selectedFlavor, onSelectFlavor }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-600" />
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-amber-900" />
      case 'Heart':
        return <Heart className="w-4 h-4 text-rose-600" />
      case 'Flame':
        return <Flame className="w-4 h-4 text-orange-500" />
      default:
        return <Sparkles className="w-4 h-4 text-rose-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold shadow-xs">
              2
            </span>
            Flavor Selection
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Crafted with gourmet couverture chocolate & fresh purées
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CAKE_FLAVORS.map((flavor) => {
          const isSelected = selectedFlavor.id === flavor.id
          return (
            <button
              key={flavor.id}
              type="button"
              onClick={() => onSelectFlavor(flavor)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200/60'
                  : 'border-stone-200/90 bg-white hover:border-rose-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${flavor.badgeColor}`}
                  >
                    {getIcon(flavor.iconName)}
                    {flavor.tag}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                        : 'border-stone-300 group-hover:border-rose-400 bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <h3 className="font-bold text-stone-900 text-base group-hover:text-rose-600 transition-colors">
                  {flavor.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-snug">
                  {flavor.description}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-medium">Flavor upgrade</span>
                <span className="text-sm font-bold text-stone-800">
                  {flavor.extraPrice === 0 ? (
                    <span className="text-emerald-600 font-semibold">Included (+₹0)</span>
                  ) : (
                    `+₹${flavor.extraPrice}`
                  )}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
