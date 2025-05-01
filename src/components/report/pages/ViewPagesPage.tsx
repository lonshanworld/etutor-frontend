"use client";

import PageTitle from "@/components/PageTitle";
import CustomLineChart from "../CustomLineChart";

export default function ViewedPages(
    {
        isSmallScreen = false,
    } : {
        isSmallScreen?: boolean;
    }
){
    return (
        <div
        className="w-full h-full px-4">
            <PageTitle title="Viewed Pages" isSmallScreen={isSmallScreen} />
            <CustomLineChart isSmallScreen={isSmallScreen} /> 
        </div>
    );
}