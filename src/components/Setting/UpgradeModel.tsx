import type { UpgradeModalProps } from "../../types/types"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { pricingTiers } from "../../constants/Data"

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  if (!isOpen) return null

 

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upgrade your plan to use this feature</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-light">
              <X size={18} />
            </button>
          </div>

          <p className="text-gray-500 mb-6 text-sm">
            You have reached the maximum number of members for your plan. Upgrade to invite more members.
          </p>

          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-1 border border-gray-300 flex gap-1">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-7 py-3 rounded-full text-sm font-medium border transition-all ${
                  billing === 'monthly'
                    ? "bg-white text-black shadow-sm border-gray-300" 
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('yearly')}
                className={`px-7 py-3 rounded-full text-sm font-medium border transition-all ${
                  billing === 'yearly'
                    ? "bg-white text-black shadow-sm border-gray-300" 
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
            {pricingTiers.slice(1).map((tier) => {
              const currentPrice = billing === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;
              const discountPercentage = Math.round(((tier.monthlyPrice - tier.yearlyPrice) / tier.monthlyPrice) * 100);

              return (
                <div key={tier.name} className="relative bg-white lg:mb-3 mb-7 border border-gray-200 rounded-lg md:rounded-none md:first:rounded-l-0 md:last:rounded-r-2xl md:border-r-0 md:last:border-r md:first:border-l">
                  {tier.isPopular && (
                    <div className="absolute -top-7 left-0 right-0">
                      <div className="bg-black text-white rounded-t-xl font-medium text-center py-1.5 text-xs w-full">Popular</div>
              </div>
                  )}
                  <div className="p-6 h-full">
                    <h3 className="text-2xl font- mb-10">{tier.name}</h3>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl">${currentPrice}</span>
                        {billing === 'yearly' && (
                          <span className="bg-gradient-to-r from-[#FA4E49] to-[#FA7C9B] text-white text-xs px-2 py-1 rounded-full font-medium">
                            {discountPercentage}% off
                          </span>
                        )}
                </div>
                      <div className="text-xs muted text-gray-600 mt-1">
                        {billing === 'yearly' ? <>per month, ${currentPrice * 12} billed annually</> : "per month"}
              </div>
            </div>

                    <button className="w-full shadow-sm mt-6 border border-gray-200 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors mb-6">
                Upgrade
              </button>

                    <div className="-mx-6 border-b pt-2 border-gray-200"></div>

                    <div className="space-y-3 mt-8">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          {!feature.text.startsWith("Everything in") ? (
                            <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          ) : null}
                          <span
                            className={`text-sm ${
                              feature.text.startsWith("Everything in") 
                                ? "text-black font-medium" 
                                : feature.isLink 
                                  ? "text-gray-700 underline decoration-dotted cursor-pointer" 
                                  : "text-gray-700"
                            }`}
                          >
                            {feature.text}
                          </span>
                </div>
                      ))}
                </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
