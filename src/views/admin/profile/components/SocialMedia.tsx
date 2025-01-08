

import CustomInput from "./CustomInput";

function SocialMedia({
  newSocialMedia,
  handleSocialMediaChange,
  handleSaveSocialMedia,
}: {
  newSocialMedia: { url: string };
  handleSocialMediaChange: (key: string, value: string) => void;
  handleSaveSocialMedia: () => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Social Media URL</label>
        <CustomInput
          type="text"
          placeholder="Enter Social Media URL"
          value={newSocialMedia.url}
          onChange={(e) => handleSocialMediaChange("url", e.target.value)}
        />
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          type="button"
          onClick={handleSaveSocialMedia}
          className="flex items-center space-x-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          <span>Save Social Media</span>
        </button>
      </div>
    </div>
  );
}

export default SocialMedia;
