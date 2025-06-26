import { useState } from 'react';
import NotionConnectModal from './NotionConnectModal';

const NotionTab = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleConfirmModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border p-8 shadow-sm">
      <div className=" items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">Notion</h2>
          <p className="text-gray-500 text-sm">
            Add and process Notion sources to train your AI Agent with precise information.{' '}
            <a href="#" className="underline ">Learn more</a>
          </p>
        </div>
        <div className="flex justify-end mt-3">
          <button
            className="bg-black text-sm hover:bg-gray-800 text-white px-3 py-1.5 rounded-md transition-colors font-medium"
            onClick={handleOpenModal}
          >
            Import from Notion
          </button>
        </div>
      </div>
      <NotionConnectModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};

export default NotionTab; 