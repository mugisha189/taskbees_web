import { DownloadIcon } from 'lucide-react'
import { GrDocumentPdf } from 'react-icons/gr'

function DocumentComponent({document}:{document:{title:string,createdAt:string}}) {
  return (
    <div className="flex w-full items-center justify-between">
    <div className="flex gap-4">
    <div className="size-12 bg-brand-100 rounded-md flex items-center justify-center">
    <GrDocumentPdf className="text-brand-700" />

    </div>
    <div className="flex  flex-col items-start">
      <p className="text-sm font-medium text-navy-700 dark:text-white">
        {document.title}
      </p>
      <p className="text-xs text-navy-700 dark:text-white">
        {document.createdAt}
      </p>
    </div>
   </div>
    <DownloadIcon className="cursor-pointer"/>
  
  </div>
  )
}

export default DocumentComponent