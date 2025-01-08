import JobCard from "@/components/job/JobCard";
import { useGetBusinessById } from "@/hooks/business";
import {  useGetJobs } from "@/hooks/job";
import { Mail, PhoneIcon } from "lucide-react";
import { GrLocation } from "react-icons/gr";
import { useParams } from "react-router-dom";

const BusinessProfile = () => {
  const { data: jobs, isLoading } = useGetJobs(
      "1","12"
  );
  const id = useParams().id
  const { data: busineess, isLoading:isBusinessLoading } = useGetBusinessById(id);
  if(isLoading||isBusinessLoading){
    return <div>Loading...</div>
  }
  console.log(busineess)
  
  console.log(id)
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className="flex flex-col h-[calc(100vh-100px)]  gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6 bg-white rounded-lg shadow">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Logo */}
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Placeholder for company image */}
            <span className="text-gray-500">Logo</span>
          </div>

          {/* Company Info */}
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800">Ubumwe Company Ltd</h2>
            <div className="flex gap-3 mt-3">
              <div className="flex gap-2 text-gray-500">
                <GrLocation/>
            <p className="text-gray-600">ADEPR Kabeza</p>
              </div>
              <div className="flex gap-2 text-gray-500">
              <PhoneIcon/>
            <p className="text-gray-600">07781787392832</p>
              </div>
              <div className="flex gap-2 text-gray-500">
<Mail/>
            <p className="text-gray-600">admin@ubumwe.co</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Open Jobs – 0
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
            Message
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col h-full flex-1 overflow-hidden bg-white  p-3 rounded-lg lg:flex-row gap-6">
        {/* About Text */}
        <div className="flex-1 p-6  overflow-auto no-scrollbar">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About Ubumwe Company Ltd</h3>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas vel nulla eveniet illo nisi voluptates, atque repudiandae deleniti, suscipit quam quisquam. Quas excepturi, eius consequuntur itaque quae cumque fugiat nostrum.
            Obcaecati impedit at, delectus perspiciatis ipsum perferendis assumenda, expedita porro accusamus distinctio odit numquam asperiores voluptate, maiores doloremque itaque temporibus libero rem voluptates provident fuga! Laboriosam sint obcaecati blanditiis harum.
            Cupiditate dolor, tempora reiciendis doloremque perferendis culpa animi tenetur iste odio quae nam amet porro provident assumenda vero molestias, veniam unde soluta laborum hic deleniti. Nihil cum ipsam perspiciatis quaerat.
            Voluptates amet sed quibusdam, velit molestiae quam numquam veniam quod magni nesciunt dignissimos adipisci odit assumenda distinctio odio iure ullam doloribus porro? Aspernatur sint vel at ex perspiciatis eaque earum.
            Adipisci, laborum magnam debitis ad cum animi corrupti suscipit pariatur, non eos incidunt iure eligendi aut tenetur culpa vitae. Officia harum molestias praesentium et vitae totam temporibus ut a culpa?
            Autem corporis a qui quae ducimus similique laborum quidem, quia suscipit facilis obcaecati sit ex dolorem ut temporibus deserunt voluptatem deleniti. Iusto tenetur consequuntur facere dicta officiis unde atque eligendi.
            Dolores perferendis quos consectetur quasi repudiandae asperiores ut repellat, quisquam exercitationem suscipit nihil facere labore animi tempora enim repellendus. Veniam voluptatibus repellat, in tempora officiis possimus sequi nam rem nesciunt!
            Nulla nam impedit consequuntur quam quaerat obcaecati repudiandae, beatae ullam possimus placeat totam, sapiente officia quo. Voluptatibus minus tempora odio debitis necessitatibus deserunt quo dolorum nemo laudantium. Debitis, sed eius.
            Nihil, ad commodi fugiat ab cumque provident dolores assumenda velit est. Delectus recusandae tenetur quae ex atque error ipsum ipsam quia deleniti eos laboriosam dolorem, corrupti ducimus veniam assumenda ullam!
            Nobis, aliquam voluptate a, veniam voluptatum omnis culpa itaque tempora delectus laborum velit fugiat perferendis excepturi possimus rem natus. Facilis quaerat velit sed consectetur ab maxime aliquam, ut quidem consequatur!
          </p>
          <p className="text-[26px] py-[20px] font-bold leading-relaxed">
          Posted Jobs
          </p>
          <div className=" grid grid-cols-1 gap-[10px]  md:grid-cols-2">
{jobs?.items.slice(0,4).map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      </div>

        </div>


        {/* Company Details */}
        <div className="w-full lg:w-[350px] bg-gray-50    p-6 rounded-lg ">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Company Details</h3>
          <ul className="text-gray-600">
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Company size:</span>
              10 - 49 People
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Phone:</span> 07781787392832
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Email:</span> admin@ubumwe.co
            </li>
            <li className="mb-2 flex justify-between">
              <span className="font-bold text-gray-800">Location:</span> ADEPR Kabeza
            </li>
            <li className="mb-2 flex items-center gap-2">
              <span className="font-bold text-gray-800">Social Media:</span>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800"
                  aria-label="Facebook"
                >
                  F
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800"
                  aria-label="Twitter"
                >
                  T
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800"
                  aria-label="LinkedIn"
                >
                  L
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
