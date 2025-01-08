//@ts-nocheck
import { RootState } from "@/store/store";
import { UploadCloud, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Portfolio({
  uploadedFiles,
  setUploadedFiles,
  initialPortfolio,
  handleSubmit,
}: {
    uploadedFiles: File[];
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  initialPortfolio: Array<{ id: string; name: string; url: string }>;
  handleSubmit: (files: File[], removedIds: string[]) => void;
}) {

  const {user}=useSelector((state:RootState)=>state.auth)
  const [existingPortfolio, setExistingPortfolio] = useState(initialPortfolio);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setUploadedFiles((prev:File[]) => [...prev, ...newFiles]);
  };

  const handleFileDelete = (index: number) => {
    setUploadedFiles((prev:File[]) => prev.filter((_, i) => i !== index));
  };

  const handleExistingDelete = (id: string) => {
    setExistingPortfolio((prev) => prev.filter((item) => item.id !== id));
    setRemovedIds((prev) => [...prev, id]);
  };

  const onSubmit = () => {
    handleSubmit(uploadedFiles, removedIds);
  };

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="flex gap-[20px] items-center">
        <div className="flex-1 flex items-center gap-[20px]">
          <label
            htmlFor="portfolio"
            className="border w-full flex justify-center items-center h-[70px] gap-[10px] px-4 rounded-lg py-2 cursor-pointer hover:bg-gray-100"
          >
            <UploadCloud />
            Upload
          </label>
          <input
            className="hidden"
            type="file"
            id="portfolio"
            accept="image/*,application/pdf"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Display Existing Portfolio */}
      {user.profile?.portifolio?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Existing Portfolio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {existingPortfolio.map((item) => (
              <div
                key={item.id}
                className="flex items-center  w-full justify-between gap-4 border p-2 rounded-lg"
              >
                {/* Display image or string */}
                {item.url.endsWith(".jpg") || item.url.endsWith(".png") ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-16 h-16 object-cover border rounded-md"
                  />
                ) : (
                  <p className="text-sm truncate">{item.name}</p>
                )}
                <button
                  type="button"
                  onClick={() => handleExistingDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">New Uploads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border p-2 rounded-lg"
              >
                {/* Display image preview if image */}
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-16 h-16 object-cover border rounded-md"
                  />
                ) : (
                  <p className="text-sm truncate">{file.name}</p>
                )}
                <button
                  type="button"
                  onClick={() => handleFileDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {(uploadedFiles.length > 0 || removedIds.length > 0) && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={onSubmit}
        >
          Save Portfolio
        </button>
      )}
    </div>
  );
}

export default Portfolio;
