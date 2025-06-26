import type { CustomCardContentProps, CustomCardProps } from "../../types/types"


const CustomCard = ({ children, className = "" }: CustomCardProps) => {
  return <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>{children}</div>
}



const CustomCardContent = ({ children, className = "" }: CustomCardContentProps) => {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>
}

export { CustomCard, CustomCardContent }
