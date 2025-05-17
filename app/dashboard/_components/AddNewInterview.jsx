// "use client"
// import React, {useState} from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';


// function AddNewInterview() {
//   const [openDailog, setOpenDailog]=useState(false);
//   const [jobPosition, setJobPosition]=useState();
//   const [jobDesc, setJobDesc]=useState();
//   const [jobExperiance, setJobExperiance]=useState();

//   const onSubmit=(e)=>{
//     e.preventDefault()
//     console.log(jobPosition, jobDesc, jobExperiance)
//   }

//   return (
//     <div>
//       <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
//       onClick={() => setOpenDailog(true)}
//       >
//           <h2 className='text-lg text-center'>+ Add Interview</h2>
//       </div>
//       <Dialog open={openDailog}>
      
//       <DialogContent className='max-w-2xl'>
//         <DialogHeader>
//           <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
//           <DialogDescription>
//             <form onSubmit={onSubmit}>
//             <div>
//               <h2 className=''>Add Details about your job position/role, job description and years of experiance</h2>

//               <div className='mt-7 my-3'>
//                 <label>Job Role/Job Position</label>
//                 <Input placeholder="Ex. Full Stack Developer" required
//                 onChange={(event)=>setJobPosition(event.target.value)}
//                 />
//               </div>

//               <div className='my-3'>
//                 <label>Job Description/ Tech Stack (In Short)</label>
//                 <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc." required
//                 onChange={(event)=>setJobDesc(event.target.value)}/>
//               </div>

//               <div className='my-3'>
//                 <label>Years of Experiance</label>
//                 <Input placeholder="Ex. 5" type="number" max="50" required
//                 onChange={(event)=>setJobExperiance(event.target.value)}/>
//               </div>
//             </div>

//             <div className='flex gap-5 justify-end'>
//               <Button type="button" variant='ghost' onClick={()=>setOpenDailog(false)}>Cancel</Button>
//               <Button type="submit">Start Interview</Button>
//             </div>
//             </form>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   </div>
    
//   )
// }

// export default AddNewInterview

"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading]=useState(false);
  const [jsonResponse, setJsonResponse]=useState([]);
  const {user}=useUser();
  const router=useRouter();

  const onSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience : "+jobExperience+" , Depends on Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question along with Answer in JSON format, Give us question and answer field on JSON"

    const result=await chatSession.sendMessage(InputPrompt);

    const MockJsonResp=(result.response.text().replace('```json','').replace('```',''))
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if(MockJsonResp)
    {
    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    }).returning({mockId:MockInterview.mockId});

    console.log("Inserted Id: ",resp);
    if(resp)
    {
      setOpenDialog(false);
      router.push('/dashboard/interview/'+resp[0]?.mockId)
    }
  }
  else{
    console.log("ERROR");
  }
    setLoading(false);
  };

  return (
    <div>
      {/* Button to Open Dialog */}
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add Interview</h2>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            {/* Fix: Directly placing text inside DialogDescription */}
            <DialogDescription>
              Add details about your job position/role, job description, and years of experience.
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Job Role/Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium">
                Job Description / Tech Stack (In Short)
              </label>
              <Textarea
                placeholder="Ex. React, Angular, NodeJs, MySql etc."
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium">Years of Experience</label>
              <Input
                placeholder="Ex. 5"
                type="number"
                max="50"
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading?
                <>
                <LoaderCircle className="animate-spin"/>'Generating from AI'
                </>:'Start Interview'
                }
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

