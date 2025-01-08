import CustomInput from "./CustomInput";
import { UploadCloud, Trash2 } from "lucide-react";

function Certificate({
  newCertificate,
  handleCertificateChange,
  handleSaveCertificate,
  certificateImage,
  setCertificateImage,
}: {
  newCertificate: {
    certificateName: string;
    issuedBy: string;
    issueDate: string;
    expirationDate: string;
    additionalInformation: string;
  };
  handleCertificateChange: any;
  handleSaveCertificate: any;
  certificateImage: File | null;
  setCertificateImage: (image: File | null) => void;
}) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files && e.target.files[0];
    if (uploadedFile) {
      setCertificateImage(uploadedFile);
    }
  };

  const handleImageDelete = () => {
    setCertificateImage(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Certificate Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Certificate Name</label>
          <CustomInput
            type="text"
            placeholder="Certificate Name"
            value={newCertificate.certificateName}
            onChange={(e) => handleCertificateChange("certificateName", e.target.value)}
          />
        </div>

        {/* Issued By */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Issued By</label>
          <CustomInput
            type="text"
            placeholder="Issued By"
            value={newCertificate.issuedBy}
            onChange={(e) => handleCertificateChange("issuedBy", e.target.value)}
          />
        </div>

        {/* Issue Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Issue Date</label>
          <CustomInput
            type="date"
            value={newCertificate.issueDate}
            onChange={(e) => handleCertificateChange("issueDate", e.target.value)}
          />
        </div>

        {/* Expiration Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
          <CustomInput
            type="date"
            value={newCertificate.expirationDate}
            onChange={(e) => handleCertificateChange("expirationDate", e.target.value)}
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="col-span-3">
        <label className="block text-sm font-medium text-gray-700">Additional Information</label>
        <textarea
          value={newCertificate.additionalInformation}
          onChange={(e) => handleCertificateChange("additionalInformation", e.target.value)}
          className="w-full h-[100px] rounded-md bg-gray-100 border-gray-200 border-[1px] text-sm text-gray-700 shadow-sm px-3 py-2"
        />
      </div>

      {/* Upload Certificate Image */}
      <div className="col-span-3">
        <label className="block text-sm font-medium text-gray-700">Upload Certificate Image</label>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="certificateImage"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
          >
            <UploadCloud className="text-gray-600" />
            <span className="text-sm text-gray-700">Upload</span>
          </label>
          <input
            type="file"
            id="certificateImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Display Uploaded Image */}
        {certificateImage && (
          <div className="mt-4 flex items-center gap-4">
            <img
              src={URL.createObjectURL(certificateImage)}
              alt="Certificate Preview"
              className="w-16 h-16 object-cover border rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">{certificateImage.name}</span>
              <span className="text-xs text-gray-500">{(certificateImage.size / 1024).toFixed(2)} KB</span>
            </div>
            <button
              type="button"
              onClick={handleImageDelete}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 />
            </button>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="mt-4 flex space-x-4">
        <button
          type="button"
          onClick={handleSaveCertificate}
          className="flex items-center space-x-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          <span>Save Certificate</span>
        </button>
      </div>
    </div>
  );
}

export default Certificate;
