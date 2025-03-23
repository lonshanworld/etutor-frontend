import ProfileImageBox from "../ProfileImageBox"

export default function MessageBox(
    {
        isMine,
        txt,
    } : {
        isMine : boolean,
        txt : string,
    }
){
    return (
        <div
        className={`w-full flex flex-row gap-3 ${isMine ? "justify-end items-end" : "justify-start items-start"}`}>
            {
                isMine === false && <ProfileImageBox />
            }
            <div
            className={`flex flex-col gap-1 max-w-[75%] md:max-w-[65%] lg:max-w-[50%] bg-gray-400 bg-opacity-30 px-4 py-3 ${isMine ? "rounded-l-2xl rounded-t-2xl " : "rounded-r-2xl rounded-b-2xl "}`}>
                <span
                className="text-base">{txt}</span>
                <span
                className={`${isMine ? "text-end" : "text-start"} text-xs opacity-50`}>07:00 pm</span>
            </div>
            {
                isMine === true && <ProfileImageBox />
            }
        </div>
    );
}