

import { useState } from "react";
import CustomInput from "../../views/admin/profile/components/CustomInput";
import { GrAdd } from "react-icons/gr";

function Skill({savedSkills,setSavedSkills}:{savedSkills:any[],setSavedSkills:any}) {
  const [newSkill, setNewSkill] = useState("");

 
  const handleSkillChange = (value: string) => {
    setNewSkill(value);
  };

  // Save skill
  const handleSaveSkill = () => {
    setSavedSkills((prev) => [...prev, newSkill]);

    setNewSkill("");
  };


  return (
    <div className="space-y-6">
      {/* Add Skill Form */}
      <div className="">
        <div className="flex pt-3 justify-between">

          <h3 className="text-xl font-semibold">Skills & Experience</h3>
          <button
            type="button"
            onClick={handleSaveSkill}
            className="  rounded-full  p-4 border"
          >
          <GrAdd/>
          </button>
        </div>

        <div className="">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Skill</label>
            <CustomInput
              type="text"
              placeholder="Skill"
              value={newSkill}
              onChange={(e) => handleSkillChange( e.target.value)}
            />
          </div>

        

        {/* Save Button */}
      
          
      
      </div>

      {/* Saved Skills */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold"></h3>
       
          {savedSkills.length > 0 && 

<div className="space-y-4 border p-4 rounded-md shadow-sm">
          {savedSkills.map((skill, index) => (
            <div key={index} className="">
             
              <div className="text-gray-700 flex items-center gap-2">
                <span className="size-[5px] bg-[#000000] rounded-full"></span>
                 {skill}
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

export default Skill;
