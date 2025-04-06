"use client";

import PageTitle from "@/components/PageTitle";
import dynamic from "next/dynamic";

const CustomPie = dynamic(() => import('@/components/report/CustomPie'), {
    ssr: false, // Disable server-side rendering
    loading: () => <p>Loading...</p>
  });

export default function ViewedBrowsersPage(){
    return (
        <div
        className="w-full h-full px-4">
            <PageTitle title="Browsers Usage" />
            <CustomPie />   
        </div>
    );
}