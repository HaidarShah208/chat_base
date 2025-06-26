import MembersMenu from "../MembersMenu";
import type { MembersTabProps } from "../../types/types";


const MembersTab = ({ onInviteMembers }: MembersTabProps) => {
  return (
    <div className="bg-white rounded-xl border py-5 px-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Members
          <span className="text-xs text-gray-500 font-normal align-middle flex items-center">1/1</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 font-medium">User</th>
              <th className="py-2 font-medium">Member since</th>
              <th className="py-2 font-medium">Role</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-transparent hover:bg-gray-50">
              <td className="py-3">haider753841@gmail.com</td>
              <td className="py-3">Jun 17, 2025</td>
              <td className="py-3">Owner</td>
              <td className="py-3 text-right relative">
                <MembersMenu />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={onInviteMembers} className="bg-black text-white font-semibold py-2 px-6 rounded-lg text-sm">
          Invite members
        </button>
      </div>
    </div>
  );
};

export default MembersTab; 