import CustomInput from "@/components/ui/CustomInput";
import { useGetCandidateById } from "@/hooks/candidate";
import { useGetJobById, useSignAgreement } from "@/hooks/job";
import { RootState } from "@/store/store";
import { Button, Modal, Tabs, Upload } from "antd";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Aggrement() {
  const id = useParams().id;
  const jobId = useParams().jobId;
  const [activeTab, setActiveTab] = useState("name");
  console.log(id);
  const { data: user, isLoading } = useGetCandidateById(id);
  const { user: loggedInUser } = useSelector((state: RootState) => state.auth);
  const { data: job, isLoading: jobLoading, error } = useGetJobById(jobId);
  console.log(loggedInUser);
  const [fullNames, setFullNames] = useState(loggedInUser?.company_name);
  const { mutate: signAgreement, isPending: isAgreementPending } =
    useSignAgreement();
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState<any>(null);
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    switch (key) {
      case "name":
        setActiveTab("name");
        break;
      case "signature":
        setActiveTab("signature");
        break;
      default:
        setActiveTab("name");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col  gap-2">
        <div className="bg-white border py-[40px] rounded-lg mx-auto mt-[30px] h-[calc(100vh-100px)] overflow-auto text-black w-full pl-0 lg:pl-10">
          <div className="container mx-auto px-4 py-8">
            <div className="w-full flex">
              <h1 className="text-xl font-bold mb-2">
                Agreement to Perform Work ({job?.job_title})
              </h1>
            </div>
            <p>
              concluded on XX. XX. XXXX according to Act No. 262/2006 Coll., the
              Labor Code, as amended
            </p>
            <p className="mt-4">Between</p>
            <br />
            <div>
              <div className="mb-2">
                <strong></strong>
              </div>
              <div className="mb-2">
                <span>Registered office:</span> <span> / </span>
              </div>

              <div className="mb-2">
                <span>Tax ID (DIČ):</span> <span> 123456789</span>
              </div>
              <div className="mb-2">
                <span>Represented by:</span>{" "}
                <span>{user?.profile.fullnames}</span>
              </div>
            </div>
            <p className="my-2">and</p>
            <div>
              <div className="mb-2">
                <strong> SIr A</strong>
              </div>
              <div className="mb-2">
                <span>Date of Birth:</span>{" "}
                <span>{user?.profile.date_of_birth}</span>
              </div>
              <div className="mb-2">
                <span>Address:</span> <span> {user?.profile.location}</span>
              </div>
            </div>
            <p className="mb-4 pt-2">
              (hereinafter referred to as the "Employee")
            </p>
            <section className="mb-2">
              <h2 className="text-lg font-medium">
                1. Subject of the Agreement
              </h2>
              <p className="mt-2"></p>
            </section>
            <section className="mb-2">
              <h2 className="text-lg font-medium">2. Place of Work</h2>
              <p className="mt-2"></p>
            </section>
            <section className="mb-2">
              <h2 className="text-lg font-medium">3. Duration of Work</h2>
              <p className="mt-2"></p>
            </section>
            <section className="mb-2">
              <h2 className="text-lg font-medium">
                4. Remuneration and Payment Details
              </h2>
              <p className="mt-2"></p>
            </section>
            <section className="mb-2">
              <h2 className="text-lg font-medium">
                5. Rights and Obligations of the Employee
              </h2>
              <p className="mt-2"></p>
            </section>
            <section className="mb-2">
              <h2 className="text-lg font-medium">
                6. Rights and Obligations of the Employer
              </h2>
              <p className="mt-2"></p>
            </section>
            <section className="mb-2">
              <h2 className="text-lg font-medium">7. Termination</h2>
              <p className="mt-2"></p>
            </section>
            <section className="mb-4">
              <h2 className="text-lg font-medium">
                8. Applicable Laws and Conditions
              </h2>
              <h3 className="my-3">
                This agreement is primarily governed by Act No. 262/2006 Coll.,
                the Labor Code, as amended, which encompasses:
              </h3>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>
                  a) Regulations on Agreements to Perform Work Outside an
                  Employment Relationship (Part 3, Sections 74-77, with specific
                  reference to Section 75 on Agreements to Perform Work).
                </li>
                <li>
                  b) Provisions on remuneration and minimum wage (Part 6).
                </li>
                <li>c) Occupational health and safety regulations (Part 5).</li>
                <li>d) Anti-discrimination Principles (Part 1, Chapter 4).</li>
              </ul>
              <h3 className="my-3">
                Additionally, this agreement is subject to:
              </h3>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>e) Act No. 586/1992 Coll., on Income Taxes, as amended.</li>
                <li>
                  f) Act No. 589/1992 Coll., on Social Security and Contribution
                  to the State Employment Policy, as amended.
                </li>
                <li>
                  g) Act No. 48/1997 Coll., on Public Health Insurance, as
                  amended.
                </li>
                <li>
                  h) Act No. 110/2019 Coll., on Personal Data Processing, as
                  amended.
                </li>
              </ul>
              <h3 className="my-3">The Employee acknowledges that:</h3>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>
                  - The scope of work must not exceed 300 hours in a calendar
                  year with the same employer.
                </li>
                <li>
                  - If the monthly income exceeds 10,000 CZK, it is subject to
                  social security and health insurance contributions.
                </li>
              </ul>
            </section>
            <section className="mb-4">
              <h2 className="text-lg font-medium">
                9. Personal Data Processing
              </h2>
              <span className="mt-2">
                9.1 The Employee acknowledges that the Employer will process
                their personal data for the purposes of this agreement and to
                fulfill legal obligations.
              </span>
              <div className="mt-2">
                9.2 The Employer will handle all personal data in accordance
                with applicable data protection laws.
              </div>
            </section>
            <section className="mb-4">
              <h2 className="text-lg font-medium">10. Final Provisions</h2>
              <div className="flex flex-col">
                <span className="mt-2">
                  10.1 This agreement is made in two copies, one for each party.
                </span>
                <span className="mt-2">
                  10.2 Any changes to this agreement must be made in writing and
                  agreed upon by both parties.
                </span>
                <span className="mt-2">
                  10.3 By signing this agreement, the Employee confirms that
                  they have been acquainted with rights and obligations arising
                  from this agreement, as well as working conditions and
                  regulations on occupational safety and health protection.
                </span>
                <span className="mt-2">
                  10.4 Matters not expressly governed by this agreement shall be
                  governed by the relevant provisions of the Labor Code and
                  related legal regulations of the Czech Republic.
                </span>
              </div>
            </section>
            {/* <button
            type="button"
            className="ant-btn css-3rel02 ant-btn-default bg-black text-white font-bold h-10"
          >
            <span>Sign Agreement</span>
          </button> */}
          </div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-[#000000] py-[15px] "
            type="primary"
          >
            Sign Agreement
          </Button>
        </div>
      </div>
      <Modal
        centered={true}
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        title="Sign Aggrement"
        footer={
          <div className="flex items-center gap-4">
            <Button
              disabled={isAgreementPending}
              key="cancel"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            ,
            <Button
              key="sign"
              type="primary"
              loading={isAgreementPending}
              onClick={async () => {
                if (activeTab === "name") {
                  await signAgreement({
                    jobId,
                    name: fullNames,
                    signature: undefined,
                  } as any);
                } else if (activeTab === "signature") {
                  await signAgreement({
                    jobId,
                    name: undefined,
                    signature,
                  } as any);
                }
              }}
            >
              Save
            </Button>
          </div>
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            { key: "name", label: "Sign By Names" },
            { key: "signature", label: "Upload Signature" },
          ]}
        ></Tabs>
        {activeTab === "name" && (
          <div className="flex flex-col gap-2">
            <p>Names</p>
            <CustomInput
              title="Full Name"
              onChange={(e) => {
                setFullNames(e.target.value);
              }}
              value={fullNames}
            />
          </div>
        )}
        {activeTab === "signature" && (
          <div className="flex flex-col gap-2">
            <Upload
              type="drag"
              multiple={false}
              name="file"
              onChange={(e) => {
                setSignature(e.file);
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <UploadIcon />
                <p className="text-center">
                  Drag and drop a file or click to upload
                </p>
              </div>
            </Upload>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Aggrement;
