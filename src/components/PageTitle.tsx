export default function PageTitle(
    {
        title
    } : {
        title : string
    }
){
    return (
        <div
        className="flex flex-col justify-between items-start">
            <span
            className="text-3xl text-font font-bold leading-none pb-[2px]">{title}</span>
            <div className="w-8 h-1 rounded-full bg-theme -mt-1"></div>
        </div>
    );
}