"use client";

import PageTitle from "@/components/PageTitle";
import dynamic from "next/dynamic";

const CustomLineChart = dynamic(() => import('@/components/report/CustomLineChart'), {
    ssr: false, // Disable server-side rendering
    loading: () => <p>Loading...</p>
  });

export default function ViewedPages(){
    return (
        <div
        className="w-full h-full px-4">
            <PageTitle title="Viewed Pages" />
            <CustomLineChart /> 
        </div>
    );
}