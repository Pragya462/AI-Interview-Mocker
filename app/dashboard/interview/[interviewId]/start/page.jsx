'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from "@/utils/db";
import { MockInterview } from '@/utils/schema'
import { jsonb } from 'drizzle-orm/pg-core';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview() {
    const params = useParams()
    const [interviewData, setInterviewData]=useState();
    const [mockInterviewQuestion, setInterviewQuestion]=useState();
    const [activeQuestionIndex, setActiveQuestionIndex]=useState(0);

    const GetInterviewDetails=async()=>
        {
            const result=await db.select().from(MockInterview).where((MockInterview.mockId==params.interviewId))

            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            console.log(jsonMockResp);
            setInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
        }
    
        useEffect(() => {
            GetInterviewDetails();
        }, [params])

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video/ Audio Recording */}
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>
            {activeQuestionIndex>0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
            {activeQuestionIndex!=mockInterviewQuestion?.length-1&& <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
            {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
            <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
            <Button>End Interview</Button>
            </Link>}
        </div>
    </div>
  )
}

export default StartInterview