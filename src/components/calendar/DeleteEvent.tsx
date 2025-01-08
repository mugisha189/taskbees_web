import React from 'react'
import { IoClose } from 'react-icons/io5';





const DeleteModal: React.FC<DeleteModalProps> = ({
  handleSubmit,
  closeModal,
  
}: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-30 z-50">
      <div className="bg-white md:mx-0 mx-[10px] rounded-[20px] shadow-lg p-6 md:w-[600px] w-full">
      <div className="flex justify-between">

<h2 className="text-lg font-bold mb-4">Delete event</h2>
<button onClick={closeModal} className="">

<IoClose/>
</button>
        </div>
        <p className='text-center text-lg font-bold mb-4'>Are you sure you want to delete this event?</p>
   
        <div className="flex gap-3 w-full justify-end">
        <button
            onClick={handleSubmit}
          type="submit"
          className="px-4 py-2 flex-1 bg-gray-500 text-white rounded-[10px]  transition-all h-[50px] hover:scale-[1.02] hover:bg-brand-blue-600"
        >
          Cancel
        </button>
          <button
            onClick={handleSubmit}
          type="submit"
          className="px-4 py-2 flex-1 bg-red-500 text-white rounded-[10px]  transition-all h-[50px] hover:scale-[1.02] hover:bg-brand-blue-600"
        >
          Delete
        </button>
      </div>
      </div>
    </div>
  )
}

export default DeleteModal
