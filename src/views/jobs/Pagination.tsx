

import { ArrowLeft, ArrowRight } from 'lucide-react';


const Pagination = ({ totalPages,currentPage,setCurrentPage }: { totalPages: number|undefined,currentPage:number,setCurrentPage:React.Dispatch<React.SetStateAction<number>>}) => {
  
  

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    
    
    if (currentPage > 2) {
      pages.push(
        <button
          key="1"
          className={`w-10 h-10 rounded-full ${
            currentPage === 1 ? 'bg-brand-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );
      if (currentPage > 3) {
        pages.push(
          <span key="ellipsis-start" className="flex items-center justify-center w-10 h-10">...</span>
        );
      }
    }

    // Add the range of pages around the current page
    for (
      let i = Math.max(1, currentPage - 2); 
      i <= Math.min(totalPages, currentPage + 2); 
      i++
    ) {
      pages.push(
        <button
          key={i}
          className={`w-10 h-10 rounded-full ${
            currentPage === i ? 'bg-brand-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    // Add the last page and ellipsis if needed
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(
          <span key="ellipsis-end" className="flex items-center justify-center w-10 h-10">...</span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className={`w-10 h-10 rounded-full ${
            currentPage === totalPages ? 'bg-brand-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex pt-[20px] w-full justify-between items-center">
      {/* Left Arrow */}
      <button 
        onClick={() => handlePageClick(currentPage - 1)} 
        disabled={currentPage === 1}
        className={`h-[46px] rounded-full flex items-center justify-center w-[46px] ${
          currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'bg-secondary'
        }`}
      >
        <ArrowLeft />
      </button>

      {/* Page Buttons */}
      <div className="flex gap-2">
        {renderPagination()}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={() => handlePageClick(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={`h-[46px] rounded-full flex items-center justify-center w-[46px] ${
          currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'bg-secondary'
        }`}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
