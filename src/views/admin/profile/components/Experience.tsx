

import CustomInput from "./CustomInput"

function Experience({newExperience,handleExperienceChange,handleSaveExperience}:{newExperience:{institution:string,title:string,degree:String,start_date:string,end_date:string,description:string},handleExperienceChange:any,handleSaveExperience:any}) {
  return (
    <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Institution */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Institution</label>
        <CustomInput
          type="text"
          placeholder="Institution"
          value={newExperience.institution}
          onChange={(e) => handleExperienceChange("institution", e.target.value)}
        />
      </div>
      {/* Field of Study */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <CustomInput
          type="text"
          placeholder="Job Title"
          value={newExperience.title}
          onChange={(e) => handleExperienceChange("title", e.target.value)}
        />
      </div>
      {/* Start Date */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <CustomInput
          type="date"
          value={newExperience.start_date}
          onChange={(e) => handleExperienceChange("start_date", e.target.value)}
        />
      </div>

      {/* End Date */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <CustomInput
          type="date"
          value={newExperience.end_date}
          onChange={(e) => handleExperienceChange("end_date", e.target.value)}
        />
      </div>
    </div>

    {/* Additional Information */}
    <div className="col-span-3">
      <label className="block text-sm font-medium text-gray-700">Additional Information</label>
      <textarea
          value={newExperience.description}
          onChange={(e) => handleExperienceChange("description", e.target.value)}
        className="w-full h-[100px] rounded-md bg-gray-100 border-gray-200 border-[1px] text-sm text-gray-700 shadow-sm px-3 py-2"
      />
    </div>

    {/* Save Button */}
    <div className="mt-4 flex space-x-4">
      <button
          type="button"
          
        onClick={handleSaveExperience}
        className="flex items-center space-x-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
      >
        <span>Save Experience</span>
      </button>
    </div>
  </div>
  )
}

export default Experience