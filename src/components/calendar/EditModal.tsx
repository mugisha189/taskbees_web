import React from 'react'
import { IoClose } from 'react-icons/io5';





const EditModal: React.FC<EditModalProps> = ({
  eventData,
  handleChange,
  handleSubmit,
  closeModal,
  
}: EditModalProps) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-30 z-50">
      <div className="bg-white md:h-fit h-[100vh] md:rounded-[20px]  shadow-lg p-6 md:w-[600px] w-full">
      <div className="flex justify-between">

<h2 className="text-lg font-bold mb-4">Edit Event</h2>
<button onClick={closeModal} className="">

<IoClose/>
</button>
</div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 md:flex-row flex-col">
            
          <div className="mb-4 flex-1">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
              <input
                placeholder='Enter title'
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4 flex-1">
            <label className="block text-sm font-medium mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
                name="location"
                placeholder='Enter location'
              value={eventData.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          </div>
          <div className="flex justify-betwen gap-2 md:flex-row flex-col">
          <div className="mb-4 flex-1">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="start"
              value={eventData.start.replace(" ","T")}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            </div>
            <div className="mb-4 flex-1">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              End Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={eventData.end.replace(" ","T")}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
</div>
       


          <div className="flex w-full justify-end">
        
            <button
              type="submit"
              className="px-4 py-2 flex-1 bg-brand-500 text-white rounded-[10px]  transition-all h-[50px] hover:scale-[1.02] hover:bg-brand-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
