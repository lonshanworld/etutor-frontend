"use client";
import { getBrowsersUsage } from "@/api/services/report";
import useLoading from "@/stores/useLoading";
import { useToast } from "@/stores/useToast";
import { useEffect, useState } from "react";
import {PieChart, Pie, Cell} from "recharts";

const colorList : string [] = [
    "#FF5733", "#6C5CE7", "#33FF57", "#E84393", "#3357FF",
    "#F1C40F", "#1ABC9C", "#FF9F43", "#8E44AD", "#00CEC9",
    "#FD7272", "#D980FA", "#2ECC71", "#F368E0", "#3498DB",
    "#A3CB38", "#E74C3C", "#48DBFB", "#F39C12", "#00A8FF",
    "#C4E538", "#9B59B6", "#10AC84", "#FF6B6B", "#00E4D0",
    "#E67E22", "#55E6C1", "#2980B9", "#FDA7DC", "#1E90FF",
    "#FDCB6E", "#6AB04C", "#FF3838", "#7D5FFF", "#3AE374",
    "#17C0EB", "#D6A2E8", "#F8EFBA", "#B33771", "#18DCFF",
    "#F97F51", "#32FF7E", "#B53471", "#CAD3C8", "#706FD3",
    "#FFB142", "#1289A7", "#9980FA", "#EE5A24", "#009432"
  ];  

interface dataModel {
    name: string;
    value: number;
    percentage : number;
}

//   const data = [
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//     { name: 'Group A', value: 100 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
//   ];

export default function CustomPie(
    {
        isSmallScreen = false,
    } : {
        isSmallScreen?: boolean;
    }
){
    const [data, setDat] = useState([] as dataModel[]);
    const {showLoading, hideLoading} = useLoading();
    const {showToast} = useToast();

    useEffect(()=>{
        const fetchData = async () => {
            try{
                showLoading();
                const response = await getBrowsersUsage();
                if(response.data){
                    const total = response.data.reduce(
                        (acc: number, item: any) => acc + item.usage_count,
                        0
                    );
                    const data = response.data.map((item: any) => ({
                        name: item.name,
                        value: item.usage_count,
                        percentage: ((item.usage_count / total) * 100).toFixed(2),
                    }));
                    setDat(data);
                }
            }catch(err){
                showToast("Error while fetching data", "Error" );
            }finally{
                hideLoading();
            }
        };
        fetchData();
    },[])

    return (
        <div
        className={`w-full h-full flex flex-col sm:flex-row justify-center items-center sm:scrollbar-none overflow-y-auto custom-scrollbar ${isSmallScreen === true ? "pb-0 pt-16 sm:pt-0" : "pb-10 "}`}>
            {
                data.length > 0 && <div
                className={`basis-0 grow-[2] w-full h-full flex justify-center items-center ${isSmallScreen === true ? "pt-3": "pt-20" } sm:pt-0`}>
                    <PieChart
                    className="w-full h-full flex justify-center items-center" width={isSmallScreen === true ? 250 : 500} height={isSmallScreen === true ? 250 : 500} onMouseEnter={undefined}>
                        <Pie
                        data={data}
                        cx={isSmallScreen === true ? 100 : 250}
                        cy={isSmallScreen === true ? 100 : 250}
                        innerRadius={isSmallScreen === true ? 50 : 100}
                        outerRadius={isSmallScreen === true ? 100 : 200}
                        fill="transparent"
                        paddingAngle={1}
                        dataKey="value"
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorList[index % colorList.length]} />
                        ))}
                        </Pie>       
                    </PieChart>
                </div>
            }
            

            <div
            className={`basis-0 grow w-full h-full  sm:overflow-y-auto custom-scrollbar  flex flex-col justify-center items-start gap-2 ${isSmallScreen === true? "pb-5" : "pb-10"}`}>
                {
                    isSmallScreen === true && data.slice(0,4).map((item, index)=>(
                        <div key={index} className="grid grid-cols-[max-content_20px_auto] items-center text-sm py-1">
                            <div
                            className="flex flex-row items-center justify-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: colorList[index % colorList.length] }}
                                ></div>
                                <span className="capitalize">{item.name}</span>
                            </div>
                            <span
                            className="w-6 text-center"> - </span>
                            <div
                            className="text-start ">{item.percentage} %</div>
                            
                        </div>
                    ))
                }
                {
                    isSmallScreen !== true && data.map((item, index)=>(
                        <div key={index} className="grid grid-cols-[max-content_20px_auto] items-center text-sm py-1">
                            <div
                            className="flex flex-row items-center justify-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: colorList[index % colorList.length] }}
                                ></div>
                                <span>{item.name}</span>
                            </div>
                            <span
                            className="w-6 text-center"> - </span>
                            <div
                            className="text-start ">{item.percentage} %</div>
                            
                        </div>
                    ))
                }

                {
                    isSmallScreen === true && <span className="text-3xl tracking-widest leading-none font-bold text-end"> ... </span>
                }
            </div>
        </div>
    );
}