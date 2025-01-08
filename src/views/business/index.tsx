
import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import CompanyCard from '@/components/business/businessCard';
import { useGetAllBusinesses } from '@/hooks/business';
import Pagination from '../jobs/Pagination';
import { Empty } from 'antd';
import { filter } from '@chakra-ui/system';
import ListSkeleton from '@/skeleton/JobListSkeleton';




function BusinessPage() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const { data: businesses, isLoading, error } = useGetAllBusinesses({page:currentPage.toString(),limit:pageSize.toString()})

  if(isLoading){
    return (
      <ListSkeleton/>
    )
  }
  if(error){
    return <div>Error: {error.message}</div>
  }
  
  const filteredCompanies =businesses? businesses?.items.filter(company => 
    company.company_name.toLowerCase().includes(searchText.toLowerCase()) ||
    company.location.toLowerCase().includes(searchText.toLowerCase())
  ):[]

  return (
    <div className="flex gap-2 pt-4">
      <div className="w-full  rounded-md p-4 bg-white">
        <div className="flex md:flex-row flex-col gap-[10px] justify-between">

        <div className="relative max-w-[300px] w-full  flex px-[3px] items-center mt-2 h-[40px] rounded-md border border-brand-300">
          <SearchIcon className=' '/>
          <input
            type="text"
            placeholder='Search by company or location'
            className="w-full placeholder:text-[14px] h-full pl-2 pr-10 rounded-md border-none focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <p className='text-gray-500 font-[500] '>Show 4 Companies
        </p>
        </div>
        <div className="flex flex-col gap-2">

        <div className="mt-2 grid grid-cols-1 gap-[20px] md:grid-cols-1 lg:grid-cols-3">
          {/* List of companies with clickable names */}
          {filteredCompanies&&filteredCompanies.length>0&&filteredCompanies.map(company => (
            <CompanyCard company={company}/>
          ))}
            
            
          </div>
          {filteredCompanies.length===0&&<Empty/>}
            {/* Pagination */}
      <div className="flex justify-center items-center">
        <div className="w-fit">
          {businesses&&businesses?.totalPages > 1&&filteredCompanies?.length>0 && (
            <Pagination
              totalPages={searchText!=''?Math.ceil(filteredCompanies?.length/pageSize):businesses?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
             
            />
          )}
        </div>
      </div>
        </div>
      </div>

    
    </div>
  );
}

export default BusinessPage;
