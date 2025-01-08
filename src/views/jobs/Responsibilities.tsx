

import { useState } from "react";
import CustomInput from "../../views/admin/profile/components/CustomInput";
import { GrAdd } from "react-icons/gr";

function Responsibilities({savedResponsibilitys,setSavedResponsibilities}:{savedResponsibilitys:any[],setSavedResponsibilities:any}) {
  const [newResponsibility, setNewResponsibility] = useState("");

  const handleResponsibilityChange = (value: string) => {
    setNewResponsibility(value);
  };

  // Save responsibility
  const handleSaveResponsibility = () => {
    setSavedResponsibilities((prev) => [...prev, newResponsibility]);

    setNewResponsibility("");
  };


  return (
    <div className="space-y-6">
      {/* Add Responsibility Form */}
      <div className="">
        <div className="flex justify-between">

          <h3 className="text-xl font-semibold">Responsabilities</h3>
          <button
            type="button"
            onClick={handleSaveResponsibility}
            className="  rounded-full  p-4 border"
          >
          <GrAdd/>
          </button>
        </div>

        <div className="">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Responsibility</label>
            <CustomInput
              type="text"
              placeholder="Responsibility"
              value={newResponsibility}
              onChange={(e) => handleResponsibilityChange( e.target.value)}
            />
          </div>

        

        {/* Save Button */}
      
          
      
      </div>

      {/* Saved Responsibilitys */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold"></h3>
       
          {savedResponsibilitys.length > 0 && 

<div className="space-y-4 border p-4 rounded-md shadow-sm">
          {savedResponsibilitys.map((responsibility, index) => (
            <div key={index} className="">
             
              <div className="text-gray-700 flex items-center gap-2">
                <span className="size-[5px] bg-[#000000] rounded-full"></span>
                 {responsibility}
              </div>
              
            </div>
          ))}
          </div>
          }
          
      </div>
      </div>
      </div>
  );
}

export default Responsibilities;
