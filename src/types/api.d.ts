/* eslint-disable @typescript-eslint/no-explicit-any */

import { NumberDomain } from "recharts/types/util/types";
import { ECarCondition } from "./enums/car/car-condition.enum";
import { ECarMake } from "./enums/car/car-make.enum";
import { ECarModel } from "./enums/car/car-model.enum";
import { ECarTransmissionType } from "./enums/car/car-transmission.enum";
import { ECarType } from "./enums/car/car-type.enum";
import { ECarUse } from "./enums/car/car-use.enum";
import { EFuelType } from "./enums/car/fuel-type.enum";
import { EConstructionStage } from "./enums/estate/construction-stage.enum";
import { EstateCommercial } from "./enums/estate/estate-commercial.enum";
import { EstateResidential } from "./enums/estate/estate-residential.enum";
import { EstateType } from "./enums/estate/estate-type.enum";
import { ELandUse } from "./enums/land/land-use.enum";
import { extend } from "leaflet";

export interface RegisterRequest {
  // firstName: string;
  // lastName: string;
  // phoneNumber: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}
export interface registerEmployeeRequest {
  company_name: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}
export interface RegisterBusinessRequest {
  email: string;
  country: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateRequest {
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  role?: string;
  profileImage?: File;
}

export interface ProfileResponse extends Response {
  payload: ProfilePayload;
}
export interface ProfilePayload {
  profile: UserProfile;
  awards: any[];
  educations: any[];
  experiences: any[];
  additional_info: any[];
  events: any[];
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface Response {
  success: boolean;
  path: string;
  method: string;
  message: string;
}
export interface UserResponse extends Response {
  payload: {
    user: User;
  };
}

export interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullnames: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  gender: string;
  profilePhoto: string;
  date_of_birth: string;
  age: number;
  phoneNumber: string[];
  qualification: Qualification;
  experience_time: ExperienceTime;
  languages: string[];
  salary_type: SalaryType;
  salary: number;
  profile_show: ProfileVisibility;
  job_title: string;
  description: string[];
  portifolio: string[];
  resume: string;
  social_networks: string[];
  location: string;
  video_url: string;
  latitude: string;
  longitude: string;
}
export interface Education {
  institution: string;
  title: string;
  start_date: string;
  degree: string;
  end_date: string;
}

export interface Certificate {
  issuedBy: string;
  description: string;
  issueDate: string;
  description: string;
}

export interface Award {
  title: string;
  description: string;
  award_date: string;
}

export interface Experience {
  title: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface User {
  educations?: Education[];
  experiences?: Experience[];
  awards?: Award[];
  profile: UserProfile;
}

export interface AuthUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  profilePhoto: string;
  role: "EMPLOYER" | "CANDIDATE";
  status: "ACTIVE" | "INACTIVE";
}

export interface RefreshTokenResponse extends Response {
  payload: {
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface AuthResponse extends Response {
  payload: {
    user: AuthUser;
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
export interface ResetTokenResponse extends Response {
  payload: {
    resetToken: string;
  };
}

export interface AllUsersResponse extends Response {
  payload: {
    items: User[];
    itemCount: number;
    totalItem: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface LandRequest {
  province: string;
  district: string;
  sector: string;
  [key: string]: any;
  name: string;
  area: number;
  description: string[];
  userId: string;
  price: number;
  validity: string;
  landUse: ELandUse;
  propertyTax: number;
  insurance: number;
  upi: string[];
  additionalInfo: string[];
  images: File[];
}

export interface CarRequest {
  province: string;
  district: string;
  sector: string;
  type: ECarType;
  car_use: ECarUse;
  name: string;
  car_model: ECarModel;
  fuel_type: EFuelType;
  car_make: ECarMake;
  transmission_type: ECarTransmissionType;
  car_condition: ECarCondition;
  engine: string;
  mileage: string;
  color: string;
  price: number;
  description: string[];
  userId: string;
  images: File[];
  plateNumber: string;
  insurance: number;
  [key: string]: any;
  tax: number;
  additionalProperties: string[];
}

export interface EstateRequest {
  province: string;
  district: string;
  sector: string;
  name: string;
  price: number;
  description: string[];
  bedrooms: number;
  bathrooms: number;
  parkings: number;
  [key: string]: any;
  area: number;
  swimmingpools: number;
  type: EstateType;
  construction_stage: EConstructionStage;
  estate_use: EstateCommercial | EstateResidential;
  accessibility: string;
  key_features: string[];
  build_year: string;
  userId: string;
  transfer_tax: number;
  home_inspection: number;
  insurance: number;
  mortgage_fees: number;
  images: File[];
}
interface commonItemFeature {
  id: string;
  images: string[];
  province: string;
  district: string;
  sector: string;
  cell: string;
  owner: string;
  name: string;
  addInfo: string[];
  type: "land" | "car" | "estate";
}
export type Item =
  | {
      id: string;
      latitude?: number;
      longitude?: number;
      images: string[];
      province: string;
      district: string;
      sector: string;
      cell: string;
      owner: string;
      name: string;
      addInfo: string[];
      type: "land";
      user: User;
      property: LandRequest;
      [key: string]: any;
    }
  | {
      id: string;
      latitude?: number;
      longitude?: number;
      images: string[];
      province: string;
      district: string;
      sector: string;
      cell: string;
      owner: string;
      name: string;
      addInfo: string[];
      user: User;
      type: "estate";
      property: EstateRequest;
      [key: string]: any;
    }
  | {
      id: string;
      latitude?: number;
      longitude?: number;
      images: string[];
      province: string;
      district: string;
      sector: string;
      cell: string;
      owner: string;
      name: string;
      addInfo: string[];
      type: "car";
      user: User;
      property: CarRequest;
      [key: string]: any;
    };

export interface AllPropertiesResponse extends Response {
  items: Item[];
  itemCount: number;
  totalItem: number;
  totalPages: number;
  currentPage: number;
}

export interface PropertyQueryParams {
  page: number;
  limit: number;
  query: string;
  commercial?: boolean;
  residential?: boolean;
  independent_house?: boolean;
  builder_floor?: boolean;
  complex?: boolean;
  under_construction?: boolean;
  ready_to_move?: boolean;
  shop?: boolean;
  office?: boolean;
  mall?: boolean;
  maximum_area?: number;
  minimum_area?: number;
  maximum_price?: number;
  minimum_price?: number;
  location?: string;
  cars?: boolean;
  estate?: boolean;
  land?: boolean;
}

export interface UserWithProperty extends Response {
  payload: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      profilePhoto: string[];
      username: string;
      createdAt: Date;
      updatedAt: Date;
      properties: Item[];
    };
  };
}

export interface UpdateCandidateData {
  gender: string;
  id: string;
  experience_time: string;
  date_of_birth: string;
  salary: number;
  video_url: string;
  salary_type: string;
  qualification: string;
  profile_show: string;
  token: string;
  location: string;
  job_title: string;
  social_networks: string;
  phoneNumber: string;
  fullnames: string;
  languages: string;
  profile_photo: File;
  categories: string;
  email: string;
  description: string;
  age: number;
  portifolio: any;
  education: any;
  awards: any;
  experience: any;
}

interface JobPostData {
  photos: File[];
  company_photos: File[];
  featured_image: File;
  gender: string;
  career_level: string;
  max_salary: number;
  application_deadline: string;
  experience: string;
  job_salary: string;
  job_apply_type: string;
  qualification: string;
  location: string;
  job_title: string;
  min_salary: number;
  job_tag: string[];
  job_email: string;
  external_url: string;
  intro_url: string;
  job_type: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  category: string;
  aggreement: string;
}

export interface Company {
  id: string;
  role: string;
  logo_image: string | null;
  company_name: string | null;
  company_email: string | null;
  website_url: string | null;
  founded_date: string | null;
  company_size: string | null;
  description: string | null;
  role: "EMPLOYER" | "CANDIDATE" | "BUSINESS";
  company_logo: string | null;
  cover_photo: string | null;
  company_photos: string[] | null;
  location: string | null;
  video_urls: string[] | null;
  cover_photo?: sting | null;
  user_email: string | null;
  categories: string[] | null;
  networks: string[] | null;
  employees_number: number | null;
  status: string | null;
}

export interface CompanyResponse extends Response {
  payload: Company;
}

export interface Job {
  id: string;
  featured_image?: string;
  has_applied?: boolean;
  job_title: string;
  description: string[];
  job_apply_type: string;
  external_url: string;
  job_email: string;
  salary_type: string;
  max_salary: number;
  status: string;
  min_salary: number;
  createdAt: string;
  experience: string;
  application_deadline: string;
  location: string;
  category: string;
  type: string;
  tags: string[];
  companyName: string;
  updatedAt: string;
  skills: string[];
  featured_image: string;
  creation_status: string;
  published: string;
  applications: number;
  responsibilities: string[];
}

export interface JobsResponse {
  success: boolean;
  path: string;
  message: string;
  payload: JobPayload;
  method: string;
  timestamp: number;
}

export interface JobPayload {
  items: Job[];
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: string;
}

// {
//   "company_name": "NaviGO",
//   "company_email": "team.navigo1@gmail.com",
//   "website_url": "https://navigo.rw",
//   "founded_date": "12/09/2023",
//   "company_size": "60-100",
//   "company_logo": "Not Specified",
//   "cover_photo": "https://res.cloudinary.com/dfiagonwj/image/upload/v1734984996/cover_images/ptsrv3uak7i5zvedqp1l.png",
//   "company_photos": [
//     "https://res.cloudinary.com/dfiagonwj/image/upload/v1734984997/company_photos/w612huyfob6lclte1i2r.png"
//   ],
//   "location": "Kigali, Rwanda",
//   "categories": [
//     "COMPLEX"
//   ],
//   "employees_number": "100",
//   "id": "3838918f-f973-43fd-ac7a-32a912d84e75",
//   "createdAt": "2024-12-23T18:16:52.011Z",
//   "updatedAt": "2024-12-23T18:16:52.011Z",
//   "jobs": 1
// }

export interface Business {
  id: string;
  createdAt: string;
  updatedAt: string;
  company_name: string;
  company_email: string;
  website_url: string;
  founded_date: string;
  company_size: string;
  company_logo: string;
  cover_photo: string;
  company_photos: string[];
  location: string;
  categories: string[];
  employees_number: string;
  jobs: number;
}

export interface BusinessPayload {
  items: Business[];
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: string;
}

export interface Event {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
  createdAt?: string;
  start_time?: string;
  end_time?: string;
  status?: string;
}

export interface FetchedEvents extends Event {
  id: string;
}
// export enum EUserApplicationStatus {
//   ONGOING='ONGOING',
//   REJECTED='REJECTED',
//   SHORTLISTED='SHORTLISTED',
//   ACCEPTED='ACCEPTED',
//   APPROVAL_WORK='APPROVAL_WORK'
// }

export interface JobApplicant {
  id: string;
  fullnames: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  applied_date: string;
  status: "ONGOING" | "REJECTED" | "SHORTLISTED" | "ACCEPTED" | "APPROVAL_WORK";
  date_applied: string;
}
export interface JobApplicantPayload {
  items: JobApplicant[];
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: string;
}

export interface InterviewRequestPayload {
  applicantId: string;
  jobId: string;
  startDate: string;
  endDate: string;
  event_time: string;
  duration: number;
  location: string;
  url: string;
}

export interface SignAgreementPayload {
  jobId: string;
  name?: string;
  signature?: any;
}

// {
//   "success": true,
//   "message": "string",
//   "payload": {
//     "completed_jobs": 0,
//     "applied_jobs": 0,
//     "shortlisted_jobs": 0,
//     "interviewed_jobs": 0
//   },
//   "path": "string",
//   "method": "string",
//   "timestamp": 1617826799860
// }

export interface CandidateStatistics extends Response {
  payload: {
    completed_jobs: number;
    applied_jobs: number;
    shortlisted_jobs: number;
    interviewed_jobs: number;
  };
}

export interface BusinessStatistics extends Response {
  payload: {
    posted_jobs: number;
    shortlisted: number;
    applications: number;
    messages: number;
  };
}
