import { Check } from 'lucide-react';
import React from 'react';
import { CiBookmark } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Candidate {
  id: number;
  image?: string;
  fullName: string;

  category?: string;
  type?: string;
  location?: string;
  date: string;
  isInvitedToInterview?:boolean,
}

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <Link to={`/employer/candidates/profile`}
      key={candidate.id}
      className="border cursor-pointer hover:border-brand-500 hover:scale-[1.01] transition-all duration-200 rounded-xl p-4 h-[140px]"
    >
      <div className="flex  w-full justify-between">
        <div className="flex items-center gap-4">
          {/* Candidate Image */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            {candidate.image ? (
              <img src={candidate.image} alt={`${candidate.fullName} image`} />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          {/* Candidate Info */}
          <div>
            <h3 className="text-lg font-semibold">{candidate.fullName}</h3>
            <p className="text-sm text-gray-600">
             
               {candidate.category && `${candidate.category}`}
            </p>
          </div>
       
        </div>
        <div className="flex items-center gap-2">
          {candidate.isInvitedToInterview?   <div className='bg-brand-400 px-[10px] rounded-md text-white'>
            Interview
          </div> : <div className="flex items-center gap-2">
              <div title='Accept' className="flex p-[5px] bg-brand-50 hover:bg-brand-200 rounded-lg text-gray-700 jusify-center items-center">

              <Check />
              </div>
              <div title='Reject' className="flex p-[5px] bg-brand-50 hover:bg-brand-200 rounded-lg text-gray-700 jusify-center items-center">

                <MdClose size={25} />
              </div>
              <div title='Shortlist' className="flex p-[5px] bg-brand-50 hover:bg-brand-200 rounded-lg text-gray-700 jusify-center items-center">

              <CiBookmark size={25} />
</div>
            
            


              </div>}
        
        </div>
      </div>
      {/* Candidate Type and Date */}
      <div className="mt-4 flex items-center gap-[10px]">
        {candidate.type && (
          <span className="text-sm font-[500] bg-[#fff6e3] text-yellow-600 px-2 py-1 rounded-full">
            {candidate.type}
          </span>
        )}
        {candidate.location && (
          <div className="text-sm px-2 py-1 rounded-full border">{candidate.location}</div>
        )}
        <span className="text-sm px-2 py-1 rounded-full border">{candidate.date}</span>
      </div>
    </Link>
  );
};

export default CandidateCard;
