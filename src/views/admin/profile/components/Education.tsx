

import { Button } from "antd"
import CustomInput from "./CustomInput"

function Education({newEducation,handleEducationChange,handleSaveEducation,loading}:{newEducation:{institution:string,title:string,degree:String,start_date:string,end_date:string,description:string},handleEducationChange:any,handleSaveEducation:any,loading:boolean}) {
  return (
    <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Institution */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Institution/School</label>
        <CustomInput
          type="text"
          placeholder="Institution/School"
          value={newEducation.institution}
          onChange={(e) => handleEducationChange("institution", e.target.value)}
        />
      </div>

      {/* Field of Study */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Field of Study</label>
        <CustomInput
          type="text"
          placeholder="Field of Study"
          value={newEducation.title}
          onChange={(e) => handleEducationChange("title", e.target.value)}
        />
      </div>

      {/* Degree */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Degree/Level of Study</label>
        <CustomInput
          type="text"
          placeholder="Degree/Level of Study"
          value={newEducation.degree}
          onChange={(e) => handleEducationChange("degree", e.target.value)}
        />
      </div>

      {/* Start Date */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <CustomInput
          type="date"
          value={newEducation.start_date}
          onChange={(e) => handleEducationChange("start_date", e.target.value)}
        />
      </div>

      {/* End Date */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <CustomInput
          type="date"
          value={newEducation.end_date}
          onChange={(e) => handleEducationChange("end_date", e.target.value)}
        />
      </div>
    </div>

    {/* Additional Information */}
    <div className="col-span-3">
      <label className="block text-sm font-medium text-gray-700">Additional Information</label>
      <textarea
          value={newEducation.description}
          onChange={(e) => handleEducationChange("description", e.target.value)}
        className="w-full h-[100px] rounded-md bg-gray-100 border-gray-200 border-[1px] text-sm text-gray-700 shadow-sm px-3 py-2"
      />
    </div>

    {/* Save Button */}
    <div className="mt-4 flex space-x-4">
        <Button
          loading={loading}
        type="button"
        onClick={handleSaveEducation}
        className="flex items-center space-x-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
      >
        <span>Save Education</span>
      </Button>
    </div>
  </div>
  )
}

export default Education