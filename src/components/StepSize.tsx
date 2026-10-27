import React from 'react'
import { Check, ShieldCheck, Scale, Users } from 'lucide-react'
import type { CakeSize } from '@/data/cakeOptions'
import { CAKE_SIZES } from '@/data/cakeOptions'

interface StepSizeProps {
  selectedSize: CakeSize
  onSelectSize: (size: CakeSize) => void
}

export const StepSize: React.FC<StepSizeProps> = ({ selectedSize, onSelectSize }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold shadow-xs">
              1
            </span>
            Cake Weight / Size
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Choose the cake size based on your guest count
          </p>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
          Base Price Included
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CAKE_SIZES.map((size) => {
          const isSelected = selectedSize.id === size.id
          return (
            <button
              key={size.id}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden group ${
                isSelected
                  ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-200/60'
                  : 'border-stone-200/90 bg-white hover:border-rose-300 hover:shadow-xs'
              }`}
            >
              {size.popular && (
                <span className="absolute top-0 right-0 bg-gradient-to-l from-rose-600 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-bl-xl shadow-xs">
                  Most Popular
                </span>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-stone-900 tracking-tight">
                      {size.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      <Users className="w-3 h-3" />
                      {size.servings}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-snug">
                    {size.description}
                  </p>
                </div>

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

              <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" /> Approx {size.weightKg * 1000}g
                </span>
                <span className="text-base font-extrabold text-stone-900">
                  ₹{size.basePrice.toLocaleString('en-IN')}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Each cake is weighted accurately before and after hand-frosting.</span>
      </div>
    </div>
  )
}
