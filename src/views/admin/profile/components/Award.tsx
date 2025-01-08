/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "./CustomInput";

function Award({
  newAward,
  handleAwardChange,
  handleSaveAward,
}: {
  newAward: {
    title: string;
    award_date: string;
    description: string;
};
  handleAwardChange: any;
  handleSaveAward: any;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <CustomInput
            type="text"
            placeholder="Field of Study"
            value={newAward.title}
            onChange={(e) => handleAwardChange("title", e.target.value)}
          />
        </div>
        {/* Award Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Award Date
          </label>
          <CustomInput
            type="date"
            value={newAward.award_date}
            onChange={(e) => handleAwardChange("award_date", e.target.value)}
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={newAward.description}
          onChange={(e) => handleAwardChange("description", e.target.value)}
          className="w-full h-[100px] rounded-md bg-gray-100 border-gray-200 border-[1px] text-sm text-gray-700 shadow-sm px-3 py-2"
        />
      </div>

      {/* Save Button */}
      <div className="mt-4 flex space-x-4">
        <button
          type="button"
          onClick={handleSaveAward}
          className="flex items-center space-x-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          <span>Save Award</span>
        </button>
      </div>
    </div>
  );
}

export default Award;
