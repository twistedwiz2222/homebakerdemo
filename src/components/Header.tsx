import React from 'react'
import { Cake, Sparkles, Clock, Award } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="mb-6 text-center">
      {/* Top Banner Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200/80 text-rose-800 text-xs font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-rose-600" />
        <span>Artisanal Handcrafted Bakes • Bangalore</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
          <Cake className="w-6 h-6" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-none m-0">
            Crumb & Whisk
          </h1>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Bespoke Celebration Cakes & Confections
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
        Customize your cake size, flavor & artistic add-ons below for an instant price quote and direct WhatsApp booking.
      </p>

      {/* Trust badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-stone-500">
        <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-lg border border-stone-200/70 shadow-2xs">
          <Award className="w-3.5 h-3.5 text-rose-600" /> 100% Pure Butter & Couverture
        </span>
        <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-lg border border-stone-200/70 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-rose-600" /> 24-48h Advance Notice
        </span>
      </div>
    </header>
  )
}
