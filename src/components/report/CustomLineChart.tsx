"use client";

import { AppRouter } from "@/router";
import { CartesianAxis, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { name: '/login', pv: 322 },
    { name: '/', pv: 500 },
    { name: '/unauthorized', pv: 421 },
    { name: '/forget-password', pv: 139 },
    { name: '/confirm-otp', pv: 297 },
    { name: '/reset-password', pv: 220 },
    { name: '/dashboard/staff', pv: 404 },
    { name: '/dashboard/staff/students', pv: 176 },
    { name: '/dashboard/staff/tutors', pv: 389 },
    { name: '/dashboard/staff/staffs', pv: 248 },
    { name: '/dashboard/staff/allocate', pv: 222 },
    { name: '/dashboard/staff/active-users', pv: 303 },
    { name: '/dashboard/staff/viewed-browsers', pv: 154 },
    { name: '/dashboard/staff/viewed-pages', pv: 275 },
    { name: '/dashboard/student', pv: 184 },
    { name: '/dashboard/student/chat', pv: 334 },
    { name: '/dashboard/student/board', pv: 265 },
    { name: '/dashboard/student/meeting', pv: 471 },
    { name: '/dashboard/student/note', pv: 142 },
    { name: '/dashboard/student/people', pv: 312 },
    { name: '/dashboard/student/chat/chatbox', pv: 228 },
    { name: '/dashboard/tutor', pv: 343 },
    { name: '/dashboard/tutor/chat', pv: 111 },
    { name: '/dashboard/tutor/board', pv: 227 },
    { name: '/dashboard/tutor/meeting', pv: 172 },
    { name: '/dashboard/tutor/note', pv: 251 },
    { name: '/dashboard/tutor/people', pv: 107 },
    { name: '/dashboard/tutor/allocatedstudent', pv: 107 },
    { name: '/dashboard/tutor/chat/chatbox', pv: 291 },
  ];

  const routeLabels: Record<string, string> = {};

  Object.entries(AppRouter).forEach(([key, value]) => {
    routeLabels[value] = key; // e.g. { "/login": "loginPage" }
  });
  
const CustomTooltip = ({ active, payload, label } : {active : any, payload : any, label : any}) => {
  if (active && payload && payload.length) {
    return (
      <div 
      className="bg-background text-font rounded-2xl px-4 py-2 border border-backgroundOpposite">
        <p>{`${label}`}</p>
        <p className="text-theme">{`View Count: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function CustomLineChart() {
    return (
        <div
        className="w-full h-[50%] md:h-full ">
            <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianAxis strokeDasharray="3 3" />
          <XAxis 
          dataKey="name"
          interval={0}
          angle={-70}
          height={110}
          fontSize={12}
          textAnchor="end" 
          tick={(props) => {
            const { x, y, payload } = props;
            const label = routeLabels[payload.value]; // Get key name if path exists
        
            return label ? (
              <text
                x={x}
                y={y + 10}
                textAnchor="end"
                fill="#099797"
                fontSize={12}
                transform={`rotate(-70, ${x}, ${y})`}
              >
                {label} {/* Display the route's key name */}
              </text>
            ) : (
              <text
                x={x}
                y={y + 10}
                textAnchor="end"
                fill="#099797"
                fontSize={10}
                transform={`rotate(-60, ${x}, ${y})`}
              >
                {payload.value} {/* Display the full path if not in the AppRouter */}
              </text>
            );
          }}
           />
          <YAxis 
          width={20}/>
          <Tooltip
          content={({ active, payload, label })=> (<CustomTooltip  active={active} payload={payload} label={label}/>)} />
          <Legend />
          <Line
           
          type="monotone" dataKey="pv" stroke="#099797" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
        </div>
    )

}