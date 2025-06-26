
function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end">
    <button className="bg-black text-white font-medium py-2 px-6 rounded-lg text-sm hover:bg-gray-800 transition-colors">
      Save
    </button>
  </div>
  )
}

export default SaveButton
