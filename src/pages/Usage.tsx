import { useState } from "react";
import Dropdown from "../components/Dropdown";
import { CustomCard, CustomCardContent } from "../components/Usage/Cards"
import DateRangePicker from "../components/Usage/DateRangePicker"
import { agentOptions } from "../constants/DropdownOptions"
import UsageHistory from "../components/Usage/UsageHistory";
import CreditsPerAgent from "../components/Usage/CreditsPerAgent";
import CircularProgress from "../components/Usage/CircularProgress";

const Usage = () => {
  const [selectedAgent, setSelectedAgent] = useState("all-agents");

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <h1 className="md:text-3xl text-2xl mb-2 lg:mb-0 font-semibold text-gray-900">Usage</h1>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <Dropdown 
              options={agentOptions} 
              value={selectedAgent}
              onChange={setSelectedAgent}
              className="min-w-52  lg:mb-0" 
            />
            <DateRangePicker className="w-[300px] border-gray-200 bg-gray-50 py-1 text-gray-900" dropdownDirection="right" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <CustomCard>
            <CustomCardContent>
              <CircularProgress value={3} maxValue={100} className="mb-3" />
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">
                  3 <span className="text-lg font-normal text-gray-500">/ 100</span>
                </div>
                <div className="text-sm text-gray-600">Credits used</div>
              </div>
            </CustomCardContent>
          </CustomCard>

          <CustomCard>
            <CustomCardContent>
              <CircularProgress value={1} maxValue={1} className="mb-3" />
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">
                  1 <span className="text-lg font-normal text-gray-500">/ 1</span>
                </div>
                <div className="text-sm text-gray-600">Agents used</div>
              </div>
            </CustomCardContent>
          </CustomCard>
        </div>

        <CustomCard>
          <CustomCardContent>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Usage history</h2>
            <UsageHistory />
          </CustomCardContent>
        </CustomCard>
        <CustomCard className="mt-8">
            <CustomCardContent>
              <CreditsPerAgent />
            </CustomCardContent>
          </CustomCard>
      </div>
    </div>
  )
}

export default Usage
