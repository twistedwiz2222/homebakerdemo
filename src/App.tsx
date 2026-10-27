import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { StepSize } from '@/components/StepSize'
import { StepFlavor } from '@/components/StepFlavor'
import { StepCustomizations, type CustomizationState } from '@/components/StepCustomizations'
import { StepEventDetails, type EventDetailsState } from '@/components/StepEventDetails'
import { PriceSummary } from '@/components/PriceSummary'
import { CAKE_SIZES, CAKE_FLAVORS, TIME_SLOTS } from '@/data/cakeOptions'

export function App() {
  // Step 1: Weight / Size
  const [selectedSize, setSelectedSize] = useState(CAKE_SIZES[1]) // Default 1 kg (popular)

  // Step 2: Flavor
  const [selectedFlavor, setSelectedFlavor] = useState(CAKE_FLAVORS[0]) // Default Classic Vanilla

  // Step 3: Customization Toggles
  const [customizations, setCustomizations] = useState<CustomizationState>({
    eggless: false,
    extraFrosting: false,
    multiTier: false,
  })

  const toggleCustomization = (key: keyof CustomizationState) => {
    setCustomizations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Tomorrow as default event date
  const tomorrow = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }, [])

  // Step 4: Event & Design details
  const [eventDetails, setEventDetails] = useState<EventDetailsState>({
    photoPreview: null,
    photoName: null,
    eventDate: tomorrow,
    timeSlot: TIME_SLOTS[1],
    orderType: 'delivery',
    deliveryAddress: '',
    cakeMessage: '',
    specialNotes: '',
  })

  const updateEventDetails = (patch: Partial<EventDetailsState>) => {
    setEventDetails((prev) => ({
      ...prev,
      ...patch,
    }))
  }

  // Calculate live total price
  const totalPrice = useMemo(() => {
    let price = selectedSize.basePrice
    price += selectedFlavor.extraPrice
    if (customizations.eggless) price += 100
    if (customizations.extraFrosting) price += 250
    if (customizations.multiTier) price += 400
    return price
  }, [selectedSize, selectedFlavor, customizations])

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 pb-36 pt-4 sm:pt-6 px-3.5 sm:px-6 w-full max-w-full overflow-x-hidden box-border">
      <div className="max-w-2xl mx-auto w-full">
        <Header />

        {/* Main interactive form card */}
        <main className="space-y-5 sm:space-y-6 bg-white/95 backdrop-blur-xs p-3.5 sm:p-7 rounded-3xl border border-stone-200/80 shadow-sm w-full box-border">
          {/* Step 1 */}
          <section>
            <StepSize
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          </section>

          <hr className="border-stone-100" />

          {/* Step 2 */}
          <section>
            <StepFlavor
              selectedFlavor={selectedFlavor}
              onSelectFlavor={setSelectedFlavor}
            />
          </section>

          <hr className="border-stone-100" />

          {/* Step 3 */}
          <section>
            <StepCustomizations
              customizations={customizations}
              onToggle={toggleCustomization}
            />
          </section>

          <hr className="border-stone-100" />

          {/* Step 4 */}
          <section>
            <StepEventDetails
              details={eventDetails}
              onChange={updateEventDetails}
            />
          </section>

          <hr className="border-stone-100" />

          {/* Detailed summary component */}
          <PriceSummary
            size={selectedSize}
            flavor={selectedFlavor}
            customizations={customizations}
            eventDetails={eventDetails}
            totalPrice={totalPrice}
          />
        </main>
      </div>
    </div>
  )
}

export default App
