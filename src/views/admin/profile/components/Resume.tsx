import { RootState } from "@/store/store";
import { UploadCloud, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

function Resume({
  file,
  setFile,
  handleSubmit,
}: {
  file: File | null;
    setFile: (file: File | null) => void;
    handleSubmit: () => void;
}) {
  const {user}=useSelector((state:RootState)=>state.auth)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files && e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  return (
    <div className="space-y-4">
 
      <div className="flex gap-[20px] items-center">
        <div className="flex-1 flex items-center gap-[20px]">
          
          <label 
            htmlFor="cv"
            className="border w-full flex justify-center items-center h-[70px] gap-[10px] px-4 rounded-lg py-2 cursor-pointer hover:bg-gray-100"
          >
            <UploadCloud />
            Upload
          </label>
          <input
            className="hidden"
            type="file"
            name="cv"
            id="cv"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>
      </div>

     
      {file && (
        <div className="flex items-center gap-4">
         
          {file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded file preview"
              className="w-16 h-16 rounded-md object-cover border"
            />
          )}
         
          <div className="flex-1">
            <p className="text-sm font-medium">Resume</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
          {/* Delete Button */}
          <button
            type="button"
            onClick={handleFileDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 />
          </button>
        </div>
      )}
      {
      file &&  <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>
        <span>Save Resume</span>
      </button>
      }
     
    </div>
  );
}

export default Resume;
