import { Edit2Icon, Share2Icon, Trash } from 'lucide-react';
import React from 'react'
import { IoClose } from 'react-icons/io5';



const ViewModal: React.FC<ViewModalProps> = ({
  eventData,
  closeModal,
  onEditEvent,
  onDeleteEvent,
  onShareEvent,
}: ViewModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-20 z-50">
      <div className="bg-white mx-2 transition-all border rounded-[20px] shadow-lg p-6 md:w-[600px] w-full">
        <div className="flex justify-between">

          <h2 className="text-lg font-bold mb-4">Event Details</h2>
          <button onClick={closeModal} className="">

          <IoClose/>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <p className="w-full rounded-lg">{eventData&&eventData.title}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location</label>
          <p className="w-full rounded-lg">{eventData.location}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <p className="w-full rounded-lg">{eventData.start}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">End  Date</label>
          <p className="w-full rounded-lg">{eventData.end}</p>
        </div>

     

        <div className="flex justify-end">
         
          <div className="flex space-x-2">
            <button
              type="button"
              className="px-2 py-2 text-yellow-500"
              onClick={onEditEvent}
            >
             <Edit2Icon/>
            </button>
            <button
              type="button"
              className="px-2 py-2 text-red-500 rounded "
              onClick={onDeleteEvent}
            >
              <Trash/>
            </button>
            <button
              type="button"
              className="px-2 py-2 text-blue-500"
              onClick={onShareEvent}
            >
              <Share2Icon/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewModal
