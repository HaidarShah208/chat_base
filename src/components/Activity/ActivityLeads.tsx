import DateRangePicker from '../Usage/DateRangePicker';
import ExportButton from '../ExportButton';

const ActivityLeads = () => {
  return (
    <div className="bg-white border rounded-xl p-8 min-h-[400px] w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-gray-900">Leads</h2>
      </div>
      <div className="mb-2">
        <div className="text-gray-700 mb-2">Filters</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <DateRangePicker className="md:w-[360px] w-full border-gray-400 bg-gray-50 py-1 text-gray-900" dropdownDirection="left" />
         <ExportButton />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-center items-center h-32 text-gray-700">
        No leads found
      </div>
    </div>
  );
};

export default ActivityLeads; 