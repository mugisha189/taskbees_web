import { UploadedFile } from "@/types/upload";
import { UploadIcon } from "lucide-react";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

interface FileUploadProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles }) => {
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles: UploadedFile[] = Array.from(e.target.files).map(
      (file, index) => ({
        file,
        id: `${file.name}_${index}`,
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (!e.dataTransfer.files) return;

    const droppedFiles: UploadedFile[] = Array.from(e.dataTransfer.files).map(
      (file, index) => ({
        file,
        id: `${file.name}_${index}`,
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id));
  };

  return (
    <div className="p-4 cursor-pointer w-full  mx-auto">
      <div
        className={`border-dashed border-2 ${
          dragging ? "border-blue-500" : "border-gray-300"
        } rounded-lg p-6 text-center`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center  flex-col cursor-pointer"
        >
          <UploadIcon />
          <p className="text-[#333333] flex items-center justify-center gap-2   text-[18px] font-[700]">
            Drag & drop files or{" "}
            <label htmlFor="file-upload" className="text-[#4C95EB] underline">
              Browse
            </label>
          </p>
        </label>
        <p className="mt-2 text-sm text-gray-500">
          Supported formats: JPEG, PNG, GIF, MP4, PDF
        </p>
      </div>

      {files != null && files.length > 0 && (
        <div className="mt-4 text-center text-gray-500">
          Uploading - {files.length}/{files.length} files
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[10px]">
        {files != null &&
          files.length > 0 &&
          files.map((file, index) => (
            <div
              key={file.id}
              className="flex font-poppins relative  w-full gap-[30px] border rounded-[5px] items-center   border-b"
            >
              <img
                src={URL.createObjectURL(file.file)}
                alt="Profile"
                className="w-24 h-24 object-cover border rounded-md"
              />
              <div className="flex items-center p-2">
                <span className="text-sm w-full overflow-hidden text-ellipsis max-w-[200px] line-clamp-1 text-[#0F0F0F">
                  {file.file.name}
                </span>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="text-red-600 p-2 hover:text-red-900"
              >
                <MdClose />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
