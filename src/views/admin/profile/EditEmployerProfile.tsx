
import { useState } from "react";
import { Field, FieldArray, Formik, Form } from "formik";
import * as Yup from "yup";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Spinner from "@/components/loader/Spinner";
import { useUpdateEmployerProfile } from "@/hooks/business";
import toast from "react-hot-toast";
import FileUpload from "@/views/jobs/FileUpload";
import { AiOutlinePlus } from "react-icons/ai";
import { Trash2Icon } from "lucide-react";

const { Option } = Select;

function EditEmployerProfile() {
  const { user: loggedInUser } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [companyImage, setCompanyImage] = useState<File[] | null>([]);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const { updateEmployerProfile } = useUpdateEmployerProfile();

  const initialValues = {
    company_name: loggedInUser?.company_name || "",
    company_email: loggedInUser?.company_email || "",
    website_url: loggedInUser?.website_url || "",
    founded_date: loggedInUser?.founded_date || "",
    company_size: loggedInUser?.company_size || "",
    description:
      loggedInUser?.description?.length > 0 ? loggedInUser.description[0] : "",
    user_email: loggedInUser?.company_email || "",
    cover_photo: loggedInUser?.cover_photo || "",
    company_photos: loggedInUser?.company_photos || [],
    location: loggedInUser?.location || "",
    categories: loggedInUser?.categories || [],
    employees_number: loggedInUser?.employees_number || "",
    phone_number: loggedInUser?.phone_number || "",
    networks: loggedInUser?.networks || [],
  };

  const validationSchema = Yup.object({
    company_name: Yup.string().required("Company name is required"),
    company_email: Yup.string()
      .email("Invalid email address")
      .required("Company email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    website_url: Yup.string().url("Invalid URL"),
    founded_date: Yup.string().required("Founded date is required"),
    company_size: Yup.string().required("Company size is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    employees_number: Yup.number()
      .required("Number of employees is required")
      .min(1, "Must be greater than 0"),
    networks: Yup.array().required("Networks are required"),
    categories: Yup.array().required("Categories are required"),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
      const allowedTypes = ["image/jpeg", "image/png"];

      if (file.size > maxSizeInBytes) {
        alert("File size exceeds the maximum limit of 1MB.");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Only .jpg and .png are allowed.");
        return;
      }

      setProfilePhoto(file);
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const formData = new FormData();
    values.company_photos = companyImage;
    values.cover_photo = profilePhoto;

    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        values[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      // const userId = localStorage.getItem("id");
      await updateEmployerProfile(loggedInUser?.id, formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 1, name: "Development" },
    { id: 2, name: "Operating Systems" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Design" },
    { id: 5, name: "Marketing" },
    { id: 6, name: "Customer Support" },
    { id: 7, name: "Project Management" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className="py-6 mt-6 flex flex-col gap-6 bg-white w-full p-6 border rounded-xl shadow-md">
          <div className="flex flex-col">
            <p className="font-semibold text-2xl mb-6">Edit Employer Profile</p>
            <div className="flex flex-col items-start mb-6">
              <p>Cover Photo</p>
              <div className="flex gap-3 items-center">
                <label htmlFor="profile" className="relative">
                  <img
                    src={
                      profilePhoto
                        ? URL.createObjectURL(profilePhoto)
                        : loggedInUser?.cover_photo
                        ? loggedInUser?.cover_photo
                        : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="rounded-full w-24 h-24 border-4 border-gray-300"
                  />
                </label>
                <p className="mt-2 text-sm max-w-[300px] text-gray-600">
                  Max file size is 1MB, Minimum dimension: 330x300. Suitable
                  files are .jpg & .png
                </p>
              </div>

              <input
                onChange={handleImageChange}
                type="file"
                id="profile"
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block font-medium">Company Name:</label>
                <Field
                  name="company_name"
                  placeholder="Company Name"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.company_name && errors.company_name && (
                  <p className="text-red-500 text-sm">{errors.company_name}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Company Email:</label>
                <Field
                  disabled
                  name="company_email"
                  type="email"
                  placeholder="Company Email"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.company_email && errors.company_email && (
                  <p className="text-red-500 text-sm">{errors.company_email}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Website URL:</label>
                <Field
                  name="website_url"
                  type="url"
                  placeholder="Website URL"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.website_url && errors.website_url && (
                  <p className="text-red-500 text-sm">{errors.website_url}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Founded Date:</label>
                <Field
                  name="founded_date"
                  type="date"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.founded_date && errors.founded_date && (
                  <p className="text-red-500 text-sm">{errors.founded_date}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Location:</label>
                <Field
                  name="location"
                  placeholder="Location"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.location && errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Phone Number:</label>
                <Field
                  name="phone_number"
                  type="tel"
                  placeholder="(123) 123-4567"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.phone_number && errors.phone_number && (
                  <p className="text-red-500 text-sm">{errors.phone_number}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">Company Size:</label>
                <Field
                  name="company_size"
                  placeholder="Company Size"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.company_size && errors.company_size && (
                  <p className="text-red-500 text-sm">{errors.company_size}</p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium text-gray-700">
                  Job Categories
                </label>
                <Select
                  name="categories"
                  mode="multiple"
                  value={values.categories}
                  onChange={(value) =>
                    handleChange({ target: { name: "categories", value } })
                  }
                  onBlur={handleBlur}
                  className="w-full overflow-auto border-gray-300 h-[60px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  placeholder="Select Job Categories"
                >
                  {categories.map((category) => (
                    <Option key={category.id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
                {touched.categories && errors.categories && (
                  <p className="text-red-500 text-sm">{errors.categories}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">
                  Number of Employees:
                </label>
                <Field
                  name="employees_number"
                  type="number"
                  placeholder="Number of Employees"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {touched.employees_number && errors.employees_number && (
                  <p className="text-red-500 text-sm">
                    {errors.employees_number}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-3">
              <label className="block font-medium">Description:</label>
              <Field
                name="description"
                as="textarea"
                placeholder="Company Description"
                className="w-full px-3 py-2 border rounded-md"
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
          </div>
          <div className="w-full pt-[20px]">
            <FieldArray name="networks">
              {({ push, remove }) => (
                <>
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Social Media
                    </h3>
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="flex items-center space-x-2 border border-gray-300 text-gray-700 rounded-full py-4 px-4 hover:bg-gray-400"
                    >
                      <AiOutlinePlus size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {values.networks &&
                      values.networks.map((link, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex items-center gap-4">
                            <Field
                              name={`networks.${index}`}
                              type="url"
                              placeholder="Enter social media link"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-600 hover:underline"
                              disabled={values.networks.length === 1}
                            >
                              <Trash2Icon />
                            </button>
                          </div>
                          {/* {touched.social_networks && errors.social_networks && (
                      <p className="text-red-500 text-sm">
                        {errors.social_networks}
                      </p>
                    )} */}
                        </div>
                      ))}
                  </div>
                </>
              )}
            </FieldArray>
          </div>

          <div className=" col-span-3">
            <FileUpload files={companyImage} setFiles={setCompanyImage} />
          </div>

          <div className="w-full flex justify-end gap-2">
            <button
              type="submit"
              className={`bg-brand-300 py-[8px] rounded-lg px-[40px] ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Update"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditEmployerProfile;
