import { useState } from "react"
import { Check } from "lucide-react"
import { advancedModels, pricingTiers, integrationsPopoverList } from "../../constants/Data"
import PopoverHover from "../Popover"
import FeatureCard from "./FeatureCard"
import FeatureCardModal from "./FeatureCardModal"
import type { FeatureCardModalProps } from "../../types/types"

export default function PricingComponent() {
  const [isYearly, setIsYearly] = useState(false)
  const [autoRechargeEnabled, setAutoRechargeEnabled] = useState(false)
  const [extraAgentsEnabled, setExtraAgentsEnabled] = useState(false)
  const [customDomainsEnabled, setCustomDomainsEnabled] = useState(false)
  const [removePoweredByChatbaseEnabled, setRemovePoweredByChatbaseEnabled] = useState(false)
  const [modalType, setModalType] = useState<null | 'auto' | 'agents' | 'customDomains' | 'removePoweredByChatbase'>(null)

  const [autoRechargeThreshold, setAutoRechargeThreshold] = useState(100)
  const [autoRechargeCredits, setAutoRechargeCredits] = useState(1000)
  const autoRechargePrice = (autoRechargeCredits / 1000) * 14
  const autoRechargeError = autoRechargeThreshold < 100 ? 'Number must be greater than or equal to 100' : ''

  const [extraAgentsCount, setExtraAgentsCount] = useState(1)
  const extraAgentsPrice = extraAgentsCount * 7

  const getModalConfig = (): FeatureCardModalProps | null => {
    if (modalType === 'auto') {
      return {
        open: true,
        onClose: () => setModalType(null),
        onConfirm: () => {
          setAutoRechargeEnabled(true)
          setModalType(null)
        },
        title: 'Auto recharge credits',
        fields: [
          {
            label: 'When credits go below:',
            value: autoRechargeThreshold,
            onChange: (v: number) => setAutoRechargeThreshold(v),
            min: 1,
            inputClassName: 'w-full',
            error: autoRechargeThreshold < 100 ? 'Number must be greater than or equal to 100' : undefined,
          },
          {
            label: 'Extra credits I want to buy:',
            value: autoRechargeCredits / 1000,
            onChange: (v: number) => setAutoRechargeCredits(v * 1000),
            min: 1,
            afterInput: '',
            inputClassName: 'w-full',
          },
        ],
        price: autoRechargePrice,
        priceLabel: 'Total per charge',
        confirmText: 'Enable',
        confirmDisabled: !!autoRechargeError,
      }
    } else if (modalType === 'agents') {
      return {
        open: true,
        onClose: () => setModalType(null),
        onConfirm: () => {
          setExtraAgentsEnabled(true)
          setModalType(null)
        },
        title: 'Extra agents',
        fields: [
          {
            label: 'I want to buy',
            value: extraAgentsCount,
            onChange: (v: number) => setExtraAgentsCount(v),
            min: 1,
            afterInput: <span className="ml-2 text-gray-700">extra agents</span>,
            inputClassName: 'w-20',
          },
        ],
        price: extraAgentsPrice,
        priceLabel: 'Total per month',
        note: 'Note: you will be immediately charged a prorated amount for the remaining days.',
        confirmText: 'Buy',
        confirmDisabled: extraAgentsCount < 1,
      }
    } else if (modalType === 'customDomains') {
      return {
        open: true,
        onClose: () => setModalType(null),
        onConfirm: () => {
          setCustomDomainsEnabled(true)
          setModalType(null)
        },
        title: 'Custom domains',
        description: (
          <>By clicking <b>Enable</b>, you will subscribe to <b>Custom domains for $59 / month</b>.</>
        ),
        fields: [],
        note: (
          <div className="flex items-center justify-between font-semibold text-base mb-2">
            <span>Custom domains</span>
            <span>$59 / month</span>
          </div>
        ),
        price: 59,
        priceLabel: '',
        confirmText: 'Enable',
        confirmDisabled: false,
        showPrice: false,
      }
    } else if (modalType === 'removePoweredByChatbase') {
      return {
        open: true,
        onClose: () => setModalType(null),
        onConfirm: () => {
          setRemovePoweredByChatbaseEnabled(true)
          setModalType(null)
        },
        title: 'Remove "Powered by Chatbase"',
        description: (
          <>By clicking <b>Enable</b>, you will subscribe to <b>Remove "Powered by Chatbase" for $39 / month</b>.</>
        ),
        note: (
          <div className="flex items-center justify-between font-semibold text-base mb-2">
            <span>Remove "Powered by Chatbase"</span>
            <span>$39 / month</span>
          </div>
        ),
        fields: [],
        price: 39,
        priceLabel: '',
        confirmText: 'Enable',
        confirmDisabled: false,
        showPrice: false,
      }
    }
    return null
  }

  const modalConfig = getModalConfig()

  const getYearlyTotal = (yearlyPrice: number) => yearlyPrice * 12
  const getDiscountPercentage = (monthlyPrice: number, yearlyPrice: number) => {
    return Math.round(((monthlyPrice - yearlyPrice) / monthlyPrice) * 100)
  }

  
  const advancedModelsPopover = (
    <ul className="list-disc pl-5 space-y-1">
      {advancedModels.map(model => (
        <li key={model}>{model}</li>
      ))}
    </ul>
  );

  const integrationsPopover = (
    <ul className="list-disc pl-5 space-y-1">
      {integrationsPopoverList.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-end mb-8">
        <div className="bg-gray-100 rounded-full p-1 border border-gray-300 flex gap-1">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-7 py-3 rounded-full text-sm font-medium border transition-all ${
              !isYearly 
                ? "bg-white text-black shadow-sm border-gray-300" 
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-7 py-3 rounded-full text-sm font-medium border transition-all ${
              isYearly 
                ? "bg-white text-black shadow-sm border-gray-300" 
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
        {pricingTiers.map((tier) => {
          const currentPrice = isYearly ? tier.yearlyPrice : tier.monthlyPrice
          const discountPercentage = getDiscountPercentage(tier.monthlyPrice, tier.yearlyPrice)

          return (
            <div   key={tier.name} className="relative bg-white mb-7 border border-gray-200 rounded-lg md:rounded-none md:first:rounded-l-3xl md:last:rounded-r-3xl md:border-r-0 md:last:border-r md:first:border-l">
              {tier.isPopular && (
                <div className="absolute  -top-7 left-0 right-0">
                  <div className="bg-black text-white rounded-t-xl font-medium text-center py-1.5 text-xs w-full">Popular</div>
                </div>
              )}
              <div className="p-6  h-full">
                <h3 className="text-2xl font- mb-10">{tier.name}</h3>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl">${currentPrice}</span>
                    {isYearly && (
                      <span className="bg-gradient-to-r from-[#FA4E49] to-[#FA7C9B] text-white text-xs px-2 py-1 rounded-full font-medium">
                        {discountPercentage}% off
                      </span>
                    )}
                  </div>
                  <div className="text-xs muted text-gray-600 mt-1">
                    {isYearly ? <>per month, ${getYearlyTotal(tier.yearlyPrice)} billed annually</> : "per month"}
                  </div>
                </div>

                <button className="w-full shadow-sm mt-6 border border-gray-200 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium  transition-colors mb-6">
                  Upgrade
                </button>

                <div className="-mx-6 border-b pt-2 border-gray-200"></div>

                <div className="space-y-3 mt-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {!feature.text.startsWith("Everything in") ? (
                        <Check className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      ) : null}
                              {feature.text === "Access to advanced models" ? (
                            <PopoverHover content={advancedModelsPopover}>
                              <span className="text-gray-700 text-sm underline decoration-dotted cursor-pointer">
                                {feature.text}
                              </span>
                            </PopoverHover>
                          ) : feature.text === "Integrations" ? (
                            <PopoverHover content={integrationsPopover}>
                              <span className="text-gray-700 text-sm underline decoration-dotted cursor-pointer">
                                {feature.text}
                              </span>
                            </PopoverHover>
                          ) : (
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
                          )}
                        </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="my-12 border border-gray-200 rounded-3xl flex shadow-sm flex-col md:flex-row items-stretch gap-0">
      <div className="flex-1 flex flex-col justify-between px-6 py-8 min-w-[180px]">
        <h3 className="text-2xl font-semibold mb-6">Enterprise</h3>
        <button className="bg-black text-white font-semibold py-2 px-6 rounded-lg text-sm">
          Contact us
        </button>
      </div>
      <div className="flex-[2] bg-[#f7f6f6] rounded-r-3xl overflow-hidden p-6 md:p-7">
        <div className="font-semibold mb-4">Everything in Pro +</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gray-600" />
              <span className="text-sm">SSO</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gray-600" />
              <span className="text-sm">SLAs</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Priority support</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Higher limits</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Success manager (CSM)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 my-8">
      <FeatureCard
        title="Auto recharge credits"
        price="$14 per 1000 message credits"
        description="When your credits falls below a certain threshold, we'll automatically add credits that don't expire to your account, ensuring uninterrupted service."
        toggleLabel={autoRechargeEnabled ? "Enabled" : "Disabled"}
        enabled={autoRechargeEnabled}
        onToggle={() => {
          if (!autoRechargeEnabled) setModalType('auto')
          else setAutoRechargeEnabled(false)
        }}
      />
      <FeatureCard
        title="Extra agents"
        price="$7 per AI agent / month"
        description="Add more AI agents to your account as your team grows. Billed monthly per agent."
        toggleLabel={extraAgentsEnabled ? "Enabled" : "Disabled"}
        enabled={extraAgentsEnabled}
        onToggle={() => {
          if (!extraAgentsEnabled) setModalType('agents')
          else setExtraAgentsEnabled(false)
        }}
      />
      <FeatureCard
        title="Custom domains"
        price="$59 / month"
        description="Use your own custom domains for the AI agent's embed script, iframe, and shareable link."
        toggleLabel={customDomainsEnabled ? "Enabled" : "Disabled"}
        enabled={customDomainsEnabled}
        onToggle={() => {
          if (!customDomainsEnabled) setModalType('customDomains')
          else setCustomDomainsEnabled(false)
        }}
      />
      <FeatureCard
        title="Extra message credits"
        price="$12 per 1000 credits / month"
        description=""
        toggleLabel={customDomainsEnabled ? "Enabled" : "Disabled"}
        enabled={customDomainsEnabled}
        onToggle={() => {
          
        }}
      />
      <FeatureCard
        title="Remove 'Powered By Chatbase'"
        price="$39 / month"
        description="Remove the Chatbase branding from the iframe and widget"
        toggleLabel={removePoweredByChatbaseEnabled ? "Enabled" : "Disabled"}
        enabled={removePoweredByChatbaseEnabled}
        onToggle={() => {
          if (!removePoweredByChatbaseEnabled) setModalType('removePoweredByChatbase')
          else setRemovePoweredByChatbaseEnabled(false)
        }}
      />
    </div>
    {modalConfig && <FeatureCardModal {...modalConfig} />}
    </div>
  )
}
