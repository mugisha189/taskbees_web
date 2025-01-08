/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebugValue, useState } from "react";
import CustomInput from "./components/CustomInput";
import { AiOutlinePlus } from "react-icons/ai";
import Education from "./components/Education";
import Resume from "./components/Resume";

import Experience from "./components/Experience";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateAdditionalInfo, useUpdateProfile } from "@/hooks/candidate";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { Modal, Select } from "antd";
import { languages } from "./data/language";
import SocialMedia from "./components/SocialMedia";
import { RootState } from "@/store/store";
import Spinner from "@/components/loader/Spinner";
import SocialMediaForm from "./components/SocialMedia";
import { Trash2Icon } from "lucide-react";
import { calculateProfileCompleteness, formatDate } from "@/utils/formatter";
import ProfileCompletion from "@/components/profile/ProfileCompleteness";
import { authenticateUser } from "@/store/actions/authAction";
import Award from "./components/Award";
import Portfolio from "./components/Portifolio";

const { Option } = Select;

function EditProfile() {
  const { user: loggedInUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {
    mutate: updateAdditionalInfo,
    isPending: isPendingAdditionalInfo,
    error: errorAdditionalInfo,
  } = useUpdateAdditionalInfo();
  const [user, setUser] = useState(loggedInUser);
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [education, setEducation] = useState(
    loggedInUser?.educations ? loggedInUser.educations : []
  );
  const [experience, setExperience] = useState(
    loggedInUser?.experiences ? loggedInUser.experiences : []
  );
  const [description, setDescription] = useState();
  const [selectedResume, setSelectedResume] = useState();
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddAward, setShowAddAward] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [addEducationLoading, setAddEducationLoading] = useState(false);
  const [uploadedPortifolio, setUploadedPortifolio] = useState<File[]>([]);
  const [addExperienceLoading, setAddExperienceLoading] = useState(false);
  const [addAwardLoading, setAddAwardLoading] = useState(false);

  const [newSocialMedia, setNewSocialMedia] = useState({
    url: "",
  });
  const [award, setAward] = useState(
    loggedInUser?.awards ? loggedInUser.awards : []
  );

  const handleSocialMediaChange = (key: string, value: string) => {
    setNewSocialMedia({ ...newSocialMedia, [key]: value });
  };
  const handleResumeSubmit = async () => {
    console.log("Saved Resume:", file);
    await updateAdditionalInfo({ resume: file });
  };

  const [file, setFile] = useState<any>(null);

  const [newEducation, setNewEducation] = useState({
    institution: "",
    title: "",
    degree: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [newExperience, setNewExperience] = useState({
    institution: "",
    title: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [newAward, setNewAward] = useState({
    title: "",
    award_date: "",
    description: "",
  });
  const initialValues = {
    gender: user?.profile.gender,
    experience_time: user?.profile.experience_time,
    date_of_birth: user?.profile.date_of_birth,
    salary: user?.profile.salary,
    video_url: user?.profile.video_url,
    salary_type: user.profile.salary_type,
    qualification: user?.profile.qualification,
    profile_show: user?.profile.profile_show,
    location: user?.profile.location,
    job_title: user?.profile.job_title,
    social_networks: user?.profile.social_networks,
    phoneNumber: user?.profile.phoneNumber && user?.profile.phoneNumber[0],
    fullnames: user?.profile.fullnames,
    languages: user?.profile.languages,
    profile_photo: user?.profile.profilePhoto,
    categories: user?.profile.categories,
    email: user?.profile.email,
    description: user?.profile.description && user?.profile.description[0],
  };

  const validationSchema = Yup.object({
    fullnames: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["MALE", "FEMALE", "BOTH"]),
    job_title: Yup.string().required("Job title is required"),
    description: Yup.string().required("Description is required"),
    experience_time: Yup.string()
      .required("Experience time is required")
      .oneOf([
        "FRESH",
        "TWO_YEARS",
        "THREE_YEARS",
        "FOUR_YEARS",
        "FIVE_YEARS_PLUS",
        "TEN_YEARS_PLUS",
      ]),
    salary_type: Yup.string()
      .required("Salary type is required")
      .oneOf(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
    salary: Yup.number()
      .required("Salary is required")
      .min(1, "Salary must be greater than 0"),
    video_url: Yup.string()
      .required("Video url is required")
      .url("Invalid url"),
    profile_show: Yup.string()
      .required("Profile show is required")
      .oneOf(["SHOW", "HIDE"]),
    location: Yup.string().required("Location is required"),
    categories: Yup.array().required("Categories is required"),

    languages: Yup.array().required("Languages is required"),
  });

  console.log(initialValues);
  console.log(user);
  const categories = [
    { id: 1, name: "Development" },
    { id: 2, name: "Operating Systems" },
    { id: 3, name: "Data Science" },
    { id: 4, name: "Design" },
    { id: 5, name: "Marketing" },
    { id: 6, name: "Customer Support" },
    { id: 7, name: "Project Management" },
  ];

  const handleAddEducation = () => {
    setShowAddEducation(true);
    setNewEducation({
      institution: "",
      title: "",
      degree: "",
      startDate: "",
      end_date: "",
      description: "",
    });
  };
  const handleAddExperience = () => {
    setShowAddExperience(true);
    setNewExperience({
      institution: "",
      title: "",
      degree: "",
      startDate: "",
      end_date: "",
      description: "",
    });
  };
  const handleSaveEducation = () => {
    newEducation.description = [newEducation.description];
    setEducation([...education, newEducation]);

    setShowAddEducation(false);

    setNewEducation({
      institution: "",
      title: "",
      degree: "",
      start_date: "",
      end_date: "",
      description: "",
    });
    setAddEducationLoading(true);
    updateAdditionalInfo({ education: [...education, newEducation] });
    setAddEducationLoading(false);
  };
  const handleSaveExperience = () => {
    newExperience.description = [newExperience.description];

    setExperience([...experience, newExperience]);

    setShowAddExperience(false);

    setNewExperience({
      institution: "",
      title: "",
      degree: "",
      start_date: "",
      end_date: "",
      description: "",
    });
    setAddExperienceLoading(true);
    updateAdditionalInfo({ experience: [...experience, newExperience] });
    setAddExperienceLoading(false);
  };
  const handleAddAward = () => {
    setShowAddAward(true);
    setNewAward({
      title: "",
      award_date: "",
      description: "",
    });
  };
  const handleAwardChange = (field, value) => {
    setNewAward((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSaveAward = () => {
    newAward.description = [newAward.description];
    setAward([...award, newAward]);
    setNewAward({
      title: "",
      award_date: "",
      description: "",
    });
    setAddAwardLoading(true);
    updateAdditionalInfo({ awards: [...award, newAward] });
    setAddAwardLoading(false);
    setShowAddAward(false);
  };

  const handleExperienceChange = (field, value) => {
    setNewExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleEducationChange = (field, value) => {
    setNewEducation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePortifolio = () => {
    updateAdditionalInfo({ portifolio: uploadedPortifolio });
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const formData = {
      ...values,
      id: user?.profile.id,
      profile_photo: profilePhoto,
    };
    try {
      await updateProfile(formData);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.message ? error.message : "Failed to update profile");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
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
  const profileCompleteness = calculateProfileCompleteness(user);

  const tasks = [
    {
      name: "Setup Profile",
      key: "profile",
      completed: profileCompleteness.composition.profile == 100,
      weight: profileCompleteness.composition.profile / 4,
    },
    {
      name: "Add Education",
      key: "education",
      completed: profileCompleteness.composition.education == 100,
      weight: profileCompleteness.composition.education / 4,
    },
    {
      name: "Experience",
      key: "experience",
      completed: profileCompleteness.composition.experience == 100,
      weight: profileCompleteness.composition.experience / 4,
    },
    {
      name: "Awards",
      key: "awards",
      completed: profileCompleteness.composition.awards == 100,
      weight: profileCompleteness.composition.awards / 4,
    },
  ];

  return (
    <>
      {(isPendingAdditionalInfo || isPending) && (
        <Modal
          centered={true}
          footer={<div></div>}
          title="Updating User profile..."
          open={isPendingAdditionalInfo || isPending}
          closable={false}
        >
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        </Modal>
      )}
      <div className="flex gap-2 h-screen !overflow-hidden overflow-y-hidden">
        <div className="flex flex-1 flex-col h-full overflow-y-auto gap-[30px] md:p-6  bg-gray-50 min-h-screen">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form className="w-full bg-white rounded-lg shadow-md md:p-8 p-[20px]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  My Profile
                </h2>
                <div className="flex flex-col items-start mb-6">
                  <label htmlFor="profile" className="relative">
                    <img
                      src={
                        profilePhoto
                          ? URL.createObjectURL(profilePhoto)
                          : user?.profile.profilePhoto
                          ? user?.profile.profilePhoto
                          : "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="rounded-full w-24 h-24 border-4 border-gray-300"
                    />
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    id="profile"
                    className="hidden"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Max file size is 1MB, Minimum dimension: 330x300. Suitable
                    files are .jpg & .png
                  </p>
                </div>

                <div className="md:grid flex flex-col  !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <CustomInput
                      type="text"
                      name="fullnames"
                      placeholder="Full Name"
                      value={values.fullnames as any}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.fullnames && (
                      <p className="text-red-500 text-sm">{errors.fullnames}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <CustomInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email as any}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <CustomInput
                      type="tel"
                      name="phoneNumber"
                      placeholder="(123) 123-4567"
                      value={values.phoneNumber as any}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <CustomInput
                      type="date"
                      name="date_of_birth"
                      value={values.date_of_birth as any}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.date_of_birth && errors.date_of_birth && (
                      <p className="text-red-500 text-sm">
                        {errors.date_of_birth}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm mb-2 font-medium text-gray-700">
                      Gender
                    </label>
                    <Select
                      value={values.gender}
                      onChange={(value) =>
                        handleChange({ target: { name: "gender", value } })
                      }
                      onBlur={handleBlur}
                      className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    >
                      <Option value="MALE">Male</Option>
                      <Option value="FEMALE">Female</Option>
                      <Option value="OTHER">Other</Option>
                    </Select>
                    {touched.gender && errors.gender && (
                      <p className="text-red-500 text-sm">{errors.gender}</p>
                    )}
                  </div>

                  {/* Show Profile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Show Profile
                    </label>
                    <Select
                      value={values.profile_show}
                      onChange={(value) =>
                        handleChange({
                          target: { name: "profile_show", value },
                        })
                      }
                      onBlur={handleBlur}
                      className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    >
                      <Option value="SHOW">Yes</Option>
                      <Option value="HIDE">No</Option>
                    </Select>
                  </div>
                  <div>
                    <label className="block font-medium mb-2"> Salary:</label>
                    <CustomInput
                      type="number"
                      name="salary"
                      value={values.salary as any}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></CustomInput>
                    {errors.salary && (
                      <p className="text-red-500 text-sm">{errors.salary}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-2"> Location:</label>
                    <CustomInput
                      type="text"
                      name="location"
                      value={values.location as any}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></CustomInput>
                    {errors.location && (
                      <p className="text-red-500 text-sm">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-2">
                      {" "}
                      Salary Type:
                    </label>
                    <Select
                      value={values.salary_type}
                      onChange={(value) =>
                        handleChange({ target: { name: "salary_type", value } })
                      }
                      onBlur={handleBlur}
                      className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    >
                      <Option value="HOURLY">Hourly</Option>
                      <Option value="DAILY">Daily</Option>
                      <Option value="WEEKLY">Weekly</Option>
                      <Option value="MONTHLY">Monthly</Option>
                      <Option value="YEARLY">Yearly</Option>
                    </Select>
                    {errors.salary_type && (
                      <p className="text-red-500 text-sm">
                        {errors.salary_type}
                      </p>
                    )}
                  </div>

                  {/* <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Country
            </label>
              <Select className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500">
                {Country.getAllCountries().map((country) => (
                  <Option key={country.isoCode} value={country.name}>
                    {country.name}
                  </Option>
                ))}
               
                
          </Select>
          </div> */}

                  {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <Select className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500">
              {City.getAllCities(country).map((city) => (
                <Option key={city.name} value={city.name}>
                  {city.name}
                </Option>
              ))}
                </Select>
            </div> */}
                  <div>
                    <label className="block text-sm mb-2 font-medium text-gray-700">
                      Experience Time
                    </label>
                    <Select
                      value={values.experience_time}
                      onChange={(value) =>
                        handleChange({
                          target: { name: "experience_time", value },
                        })
                      }
                      onBlur={handleBlur}
                      className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    >
                      <Option value="FRESH">Less than 1 year</Option>
                      <Option value="TWO_YEARS">2 Years</Option>
                      <Option value="THREE_YEARS">3 Years</Option>
                      <Option value="FOUR_YEARS">4 Years</Option>
                      <Option value="FIVE_YEARS_PLUS">5 Years+</Option>
                      <Option value="TEN_YEARS_PLUS">10 Years+</Option>
                    </Select>
                    {touched.experience_time && errors.experience_time && (
                      <p className="text-red-500 text-sm">
                        {errors.experience_time}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 font-medium text-gray-700">
                      Qualification
                    </label>
                    <Select
                      value={values.qualification}
                      onChange={(value) =>
                        handleChange({
                          target: { name: "qualification", value },
                        })
                      }
                      onBlur={handleBlur}
                      className="w-full border-gray-300 h-[50px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    >
                      <Option value="CERTIFICATE">Certificate</Option>
                      <Option value="ASSOCIATE_DEGREE">Associate Degree</Option>
                      <Option value="BACHELORS_DEGREE">Bachelor Degree</Option>
                      <Option value="MASTERS_DEGREE">Masters Degree</Option>
                      <Option value="DOCTORATE_DEGREE">Doctorate Degree</Option>
                    </Select>
                    {touched.qualification && errors.qualification && (
                      <p className="text-red-500 text-sm">
                        {errors.qualification}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2 font-medium text-gray-700">
                      Language
                    </label>
                    <Select
                      mode="multiple"
                      value={values.languages}
                      onChange={(value) =>
                        handleChange({ target: { name: "languages", value } })
                      }
                      onBlur={handleBlur}
                      className="w-full overflow-auto border-gray-300 h-[60px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    >
                      {Object.keys(languages).map((key) => (
                        <Option
                          key={languages[key].name}
                          value={languages[key].name}
                        >
                          {languages[key].name}
                        </Option>
                      ))}
                    </Select>
                    {touched.languages && errors.languages && (
                      <p className="text-red-500 text-sm">{errors.languages}</p>
                    )}
                  </div>

                  {/* Street Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    <CustomInput
                      type="text"
                      name="job_title"
                      placeholder="Job Title"
                      value={values.job_title as any}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.job_title && errors.job_title && (
                      <p className="text-red-500 text-sm">{errors.job_title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Intro Video Url
                    </label>
                    <CustomInput
                      type="url"
                      name="video_url"
                      placeholder="Video Url"
                      value={values.video_url as any}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.video_url && errors.video_url && (
                      <p className="text-red-500 text-sm">{errors.video_url}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2 font-medium text-gray-700">
                      Categories
                    </label>
                    <Select
                      mode="multiple"
                      value={values.categories}
                      onChange={(value) =>
                        handleChange({ target: { name: "categories", value } })
                      }
                      onBlur={handleBlur}
                      className="w-full overflow-auto border-gray-300 h-[60px] shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      placeholder="Select  Categories"
                    >
                      {categories.map((category) => (
                        <Option key={category.id} value={category.name}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                    {touched.categories && errors.categories && (
                      <p className="text-red-500 text-sm">
                        {errors.categories}
                      </p>
                    )}
                  </div>

                  {/* {JSON.stringify(errors)} */}

                  {/* Bio */}
                  <div className="col-span-3 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full h-[100px] rounded-md bg-gray-100 border-gray-200 border-[1px] text-sm text-gray-700 shadow-sm px-3 py-2"
                    />
                    {touched.description && errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full pt-[20px]">
                  <FieldArray name="social_networks">
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
                          {values.social_networks &&
                            values.social_networks.map((link, index) => (
                              <div key={index} className="mb-4">
                                <div className="flex items-center gap-4">
                                  <Field
                                    name={`social_networks.${index}`}
                                    type="url"
                                    placeholder="Enter social media link"
                                    value={link}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-600 hover:underline"
                                    disabled={
                                      values.social_networks?.length === 1
                                    }
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

                <button
                  type="submit"
                  className="h-[50px]  w-full text-white flex items-center justify-center rounded-md md:w-[200px] bg-[#000000]"
                >
                  {isPending ? <Spinner /> : "Save"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Education Background
              </h3>
              <button
                type="button"
                onClick={handleAddEducation}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 rounded-full py-4 px-4 hover:bg-gray-400"
              >
                <AiOutlinePlus size={18} />
              </button>
            </div>

            {showAddEducation && (
              <Education
                loading={addEducationLoading}
                newEducation={newEducation}
                handleEducationChange={handleEducationChange}
                handleSaveEducation={handleSaveEducation}
              />
            )}

            {education.length > 0 && (
              <div className="rounded-lg mt-[20px] border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Institution
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Field of Study
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Degree
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Start Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          End Date
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {education.map((edu, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {edu.institution}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.title}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.degree}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.start_date.split("-")[0]}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.end_date.split("-")[0]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-b-lg  border-gray-200 px-4 py-2"></div>
              </div>
            )}
          </div>

          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Resume</h3>
            </div>

            <Resume
              file={file}
              setFile={setFile}
              handleSubmit={handleResumeSubmit}
            />
          </div>
          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Portifolio
              </h3>
            </div>

            <Portfolio
              initialPortfolio={
                loggedInUser?.profile.portifolio
                  ? loggedInUser.profile.portifolio
                  : []
              }
              setUploadedFiles={setUploadedPortifolio}
              uploadedFiles={uploadedPortifolio}
              handleSubmit={handleSavePortifolio}
            />
          </div>

          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Experience
              </h3>
              <button
                type="button"
                onClick={handleAddExperience}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 rounded-full py-4 px-4 hover:bg-gray-400"
              >
                <AiOutlinePlus size={18} />
              </button>
            </div>
            {addExperienceLoading && (
              <div className="flex justify-center bg-red-500 items-center mt-4">
                <Spinner />
              </div>
            )}
            {showAddExperience && (
              <Experience
                newExperience={newExperience}
                handleExperienceChange={handleExperienceChange}
                handleSaveExperience={handleSaveExperience}
              />
            )}
            {experience.length > 0 && (
              <div className="rounded-lg mt-[20px] border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Institution
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Title
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Start Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          End Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Description
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {experience.map((edu, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {edu.institution}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.title}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.start_date.split("-")[0]}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.end_date.split("-")[0]}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {edu.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-b-lg  border-gray-200 px-4 py-2"></div>
              </div>
            )}
          </div>

          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Award</h3>
              <button
                type="button"
                onClick={handleAddAward}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 rounded-full py-4 px-4 hover:bg-gray-400"
              >
                <AiOutlinePlus size={18} />
              </button>
            </div>

            {showAddAward && (
              <Award
                newAward={newAward}
                handleAwardChange={handleAwardChange}
                handleSaveAward={handleSaveAward}
              />
            )}

            {award.length > 0 && (
              <div className="rounded-lg mt-[20px] border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Title
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Description
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {award.map((awd, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {awd.title}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {awd.description}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {awd.award_date.split("-")[0]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-b-lg  border-gray-200 px-4 py-2"></div>
              </div>
            )}
          </div>
        </div>
        <ProfileCompletion tasks={tasks} completeness={profileCompleteness} />
      </div>
    </>
  );
}

export default EditProfile;
