import React, { useEffect, useState } from "react"
import type { FeatureCardModalProps } from "../../types/types"
import { ANIMATION_DURATION } from "../../constants/Data"

const FeatureCardModal: React.FC<FeatureCardModalProps & { showPrice?: boolean }> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  fields,
  price,
  priceLabel = "Total per charge",
  note,
  confirmText = "Enable",
  confirmDisabled = false,
  showPrice = true,
}) => {
  const [visible, setVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(open)

  useEffect(() => {
    if (open) {
      setShouldRender(true)
      setTimeout(() => setVisible(true), 10)
    } else {
      setVisible(false)
      const timeout = setTimeout(() => setShouldRender(false), ANIMATION_DURATION)
      return () => clearTimeout(timeout)
    }
  }, [open])

  if (!shouldRender) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className={`bg-white rounded-xl shadow-xl w-full max-w-xl px-6 py-6 relative transform transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-xl"
          onClick={() => {
            setVisible(false)
            setTimeout(onClose, ANIMATION_DURATION)
          }}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {description && <div className="text-gray-700 text-sm mb-4">{description}</div>}
        {fields.map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <div className="flex items-center gap-2">
              {field.beforeInput}
              <input
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                value={field.value}
                onChange={e => field.onChange(Number(e.target.value))}
                className={`border border-gray-300 rounded-xl bg-gray-100 px-3 py-1.5 text-gray-900 focus:outline-none focus:ring-0 ${field.inputClassName || 'w-full'}`}
              />
              {field.afterInput}
            </div>
            {field.error && <div className="text-red-600 text-sm mt-1">{field.error}</div>}
          </div>
        ))}
        {note && <div className="text-xs text-gray-800 mb-10">{note}</div>}
        {showPrice !== false && (
          <>
            <hr className="my-4" />
            <div className="text-lg font-semibold mb-1">${Math.round(price)}</div>
            <div className="text-gray-500 text-xs mb-6">{priceLabel}</div>
          </>
        )}
        <div className="flex justify-end gap-3">
          <button
            className="border border-gray-300 rounded-lg px-5 py-1.5 text-sm font-medium bg-white hover:bg-gray-100"
            onClick={() => {
              setVisible(false)
              setTimeout(onClose, ANIMATION_DURATION)
            }}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white rounded-lg px-5 py-1.5 text-sm font-medium hover:bg-gray-900"
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeatureCardModal 