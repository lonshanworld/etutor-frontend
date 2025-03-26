export default function PreviewBox(
    {
        files
    } : {
        files: File[]
    }
){
    return (
        <span className="z-50">file count : {files.length}</span>
    );
}