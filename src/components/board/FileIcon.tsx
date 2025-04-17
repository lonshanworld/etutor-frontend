import { JSX } from "react";
import {
  AiOutlineFile,
  AiOutlineFileExcel,
  AiOutlineFilePdf,
  AiOutlineFilePpt,
  AiOutlineFileWord,
} from "react-icons/ai";

const FileIcon = ({ fileName }: { fileName: string }) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  const iconMap: Record<string, JSX.Element> = {
    pdf: (
      <AiOutlineFilePdf
        size={28}
        className='text-red-500'
      />
    ),
    doc: (
      <AiOutlineFileWord
        size={28}
        className='text-blue-700'
      />
    ),
    docx: (
      <AiOutlineFileWord
        size={28}
        className='text-blue-700'
      />
    ),
    xls: (
      <AiOutlineFileExcel
        size={28}
        className='text-green-600'
      />
    ),
    xlsx: (
      <AiOutlineFileExcel
        size={28}
        className='text-green-600'
      />
    ),
    ppt: (
      <AiOutlineFilePpt
        size={28}
        className='text-orange-500'
      />
    ),
    pptx: (
      <AiOutlineFilePpt
        size={28}
        className='text-orange-500'
      />
    ),
  };
  return (
    iconMap[ext || ""] || (
      <AiOutlineFile
        size={28}
        className='text-secondaryText'
      />
    )
  );
};

export default FileIcon;
