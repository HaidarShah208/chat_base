
import { useState } from "react"
import { Settings2, Search, Grid3X3 } from "lucide-react"

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="max-w-5xl container  p-4 mx-auto md:px-8 lg:px-12 py-6">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="md:text-3xl text-lg font-semibold text-gray-900">
            Contacts <span className="text-xl font-normal">0</span>
          </h1>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-gray-500 border border-gray-300 rounded-lg hover:bg-gray-600">
            <Settings2 className="w-4 h-4" />
            Manage attributes
          </button>
        </div>  

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="md:w-1/2 w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Grid3X3 className="w-4 h-4" />
                Columns
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-600 bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 font-medium">External ID</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-gray-500 text-sm">
                        No contacts found. You can start adding contacts through our API.
                      </p>
                      <button className="text-gray-800 text-sm font-medium ">
                        View our API documentation
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50/7">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Rows per page: 20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
