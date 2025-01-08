import { User } from "@/types/api";

export function base64ToFile(base64String: string, fileName: string): File {
  const arr = base64String.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const byteString = atob(arr[1]); // Decode Base64 string

  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}


export function findSocialMedia(url: string): string {
  const socialMediaMap: { [key: string]: string } = {
    "github.com": "GitHub",
    "linkedin.com": "LinkedIn",
    "x.com": "Twitter",
    "facebook.com": "Facebook",
    "instagram.com": "Instagram",
    "youtube.com": "YouTube",
    "tiktok.com": "TikTok",
    "reddit.com": "Reddit",
    "t.me": "Telegram",
    "discord.com": "Discord",
    "medium.com": "Medium",
    "skype.com": "Skype",
    "stackoverflow.com": "Stack Overflow",
  };

  for (const domain in socialMediaMap) {
    if (url.includes(domain)) {
      return socialMediaMap[domain];
    }
  }
  return "Unknown";
}




export const formatDate = (dateString:string) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};


export const convertFileToBase64 = (file: File): Promise<string> => {
  console.log(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result?.toString();
      if (base64String) {
        console.log(base64String)
        resolve(base64String);
        
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
  });
};

export function formatDateReadable(dateInput:string) {
  // Convert the input to a Date object
  const date = new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract day, month, and year
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Return formatted date
  return `${day} ${month} ${year}`;
}

export function formatOptionValue(optionValue:string) {
  switch (optionValue) {
    case "TWO_YEARS":
      return "2 Years";
    case "THREE_YEARS":
      return "3 Years";
    case "FOUR_YEARS":
      return "4 Years";
    case "FIVE_YEARS_PLUS":
      return "5+ Years";
    case "TEN_YEARS_PLUS":
      return "10+ Years";
    default:
      return "Unknown"; 
  }
}

export function ensureSeconds(time:string) {
  const timeParts = time.split(":");
  if (timeParts.length === 2) {
    return `${time}:00`;
  }
  return time;
}

export function convertTimeToHoursMinutes(time:string) {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
}


export function calculateProfileCompleteness(user: User|null): { 
  total: number; 
  composition: Record<string, number>; 
  missingFields: Record<string, string[]>; 
} {
  let totalFields = 0;
  let completedFields = 0;
  const sectionFields: Record<string, { total: number; completed: number }> = {
    profile: { total: 0, completed: 0 },
    education: { total: 0, completed: 0 },
    experience: { total: 0, completed: 0 },
    awards: { total: 0, completed: 0 },
  };

  const missingFields: Record<string, string[]> = {
    profile: [],
    education: [],
    experience: [],
    awards: [],
  };

  const isCompleted = (field: any): boolean => {
    if (Array.isArray(field)) return field.length > 0;
    return field !== null && field !== undefined && field !== "";
  };

  const profile = user?user.profile:{};
  const profileFieldNames = [
    "fullnames",
    "email",
    "role",
    "status",
    "gender",
    "profilePhoto",
    "date_of_birth",
    "age",
    "phoneNumber",
    "qualification",
    "experience_time",
    "languages",
    "salary_type",
    "salary",
    "profile_show",
    "job_title",
    "description",
    "portifolio",
    "resume",
    "social_networks",
    "location",
    "video_url",
    "latitude",
    "longitude",
  ];

  const profileFields = profileFieldNames.map(fieldName => ({
    name: fieldName,
    value: profile[fieldName as keyof typeof profile],
  }));

  sectionFields.profile.total += profileFields.length;
  sectionFields.profile.completed += profileFields.filter(({ value }) => isCompleted(value)).length;
  missingFields.profile = profileFields
    .filter(({ value }) => !isCompleted(value))
    .map(({ name }) => name);

  if (user&&user.educations) {
    sectionFields.education.total += user.educations.length * 5;
    sectionFields.education.completed += user.educations.reduce((count, edu) => {
      const fields = [
        { name: "institution", value: edu.institution },
        { name: "title", value: edu.title },
        { name: "start_date", value: edu.start_date },
        { name: "end_date", value: edu.end_date },
        { name: "description", value: edu.description },
      ];
      missingFields.education.push(
        ...fields.filter(({ value }) => !isCompleted(value)).map(({ name }) => name)
      );
      return count + fields.filter(({ value }) => isCompleted(value)).length;
    }, 0);
  }

  if (user&&user.experiences) {
    sectionFields.experience.total += user.experiences.length * 4;
    sectionFields.experience.completed += user.experiences.reduce((count, exp) => {
      const fields = [
        { name: "title", value: exp.title },
        { name: "start_date", value: exp.start_date },
        { name: "end_date", value: exp.end_date },
        { name: "description", value: exp.description },
      ];
      missingFields.experience.push(
        ...fields.filter(({ value }) => !isCompleted(value)).map(({ name }) => name)
      );
      return count + fields.filter(({ value }) => isCompleted(value)).length;
    }, 0);
  }

  if (user&&user.awards) {
    sectionFields.awards.total += user.awards.length * 3;
    sectionFields.awards.completed += user.awards.reduce((count, award) => {
      const fields = [
        { name: "title", value: award.title },
        { name: "description", value: award.description },
        { name: "award_date", value: award.award_date },
      ];
      missingFields.awards.push(
        ...fields.filter(({ value }) => !isCompleted(value)).map(({ name }) => name)
      );
      return count + fields.filter(({ value }) => isCompleted(value)).length;
    }, 0);
  }

  totalFields =
    sectionFields.profile.total +
    sectionFields.education.total +
    sectionFields.experience.total +
    sectionFields.awards.total;

  completedFields =
    sectionFields.profile.completed +
    sectionFields.education.completed +
    sectionFields.experience.completed +
    sectionFields.awards.completed;

  
  const completeness = (completedFields / totalFields) * 100;

 
  const composition = {
    profile: parseFloat(((sectionFields.profile.completed / sectionFields.profile.total) * 100 || 0).toFixed(2)),
    education: parseFloat(((sectionFields.education.completed / sectionFields.education.total) * 100 || 0).toFixed(2)),
    experience: parseFloat(((sectionFields.experience.completed / sectionFields.experience.total) * 100 || 0).toFixed(2)),
    awards: parseFloat(((sectionFields.awards.completed / sectionFields.awards.total) * 100 || 0).toFixed(2)),
  };

  return {
    total: parseFloat(completeness.toFixed(2)),
    composition,
    missingFields,
  };
}

export function formatFieldName(fieldName: string): string {
  return fieldName
    .toLowerCase() 
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)([a-z])/g, (match) => match.toUpperCase()); 
}
