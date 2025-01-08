import { Business } from '@/types/api';
import React from 'react';
import { CiBookmark } from 'react-icons/ci';

// interface Company {
//   id: number;
//   logo?: string;
//   title: string;
//   name: string;
//   category?: string;
//   location?: string;
//   date: string;
 
// }

interface CompanyCardProps {
  company: Business;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div
      key={company.id}
      className="border cursor-pointer hover:border-brand-500 hover:scale-[1.01] transition-all duration-200 rounded-xl p-4 h-[140px]"
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            {company.cover_photo ? (
              <img src={company.cover_photo} alt={`${company.company_name} logo`} />
            ) : (
              <span className="text-gray-400">No Logo</span>
            )}
          </div>
          {/* Company Info */}
          <div>
            <h3 className="text-lg line-clamp-1 overflow-hidden text-ellipsis font-semibold">{company.company_name}</h3>
            <p className="text-sm capitalize text-gray-600">
              {company.categories&&company.categories.join(', ').toLowerCase()}
            </p>
          </div>
       
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
             
              <CiBookmark />


              </div>
        
        </div>
      </div>
      {/* Company Type and Date */}
      <div className="mt-4 flex items-center gap-[10px]">
        
        {company.location && (
          <div className="text-sm px-2 py-1 rounded-full border">{company.location}</div>
        )}
        <span className="text-sm px-2 py-1 rounded-full border">{company.founded_date}</span>
      </div>
    </div>
  );
};

export default CompanyCard;
