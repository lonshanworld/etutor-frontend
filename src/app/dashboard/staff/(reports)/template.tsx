export default function ReportTemplate(
    {
        children,
    } : {
        children : React.ReactNode
    }
){
    return (
        <div
        className="w-full h-full relative">
            <div
            className="absolute top-0 left-0 right-0 -bottom-16 overflow-hidden">
                {
                    children
                }
            </div>
        </div>
    );
}