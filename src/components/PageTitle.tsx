export default function PageTitle(
    {
        title,
        isSmallScreen = false,
    } : {
        title : string
        isSmallScreen?: boolean;
    }
){
    return (
        <div
        className="flex flex-col justify-between items-start">
            <span
            className={`${isSmallScreen !== true ? "text-3xl" : "text-lg"} text-font font-bold leading-none pb-[2px]`}>{title}</span>
            {
                isSmallScreen !== true && <div className="w-8 h-1 rounded-full bg-theme -mt-1"></div>
            }
        </div>
    );
}