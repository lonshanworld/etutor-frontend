const MAX_FILE_SIZE_Forchat = 4 * 1024 * 1024; // 4MB in bytes



export function getFileType(file: File): string {
  const fileType = file.type.split('/')[0];
  if (fileType === 'image') {
    return 'image';
  } else if (fileType === 'video') {
    return 'video';
  }else{
    return 'file';
  }
}

export function getFileTypeByExtension(file: string): string {
  const extension = file.split('.').pop()?.toLowerCase();
  
  if (!extension) return "Unknown";

  const fileTypes: { [key: string]: string } = {
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'bmp': 'Image',
      'webp': 'Image',
      'svg': 'Image',
      'mp3': 'Audio',
      'wav': 'Audio',
      'ogg': 'Audio',
      'aac': 'Audio',
      'flac': 'Audio',
      'mp4': 'Video',
      'avi': 'Video',
      'mov': 'Video',
      'mkv': 'Video',
      'webm': 'Video',
      'wmv': 'Video',
      'flv': 'Video',
      'doc': 'Document',
      'docx': 'Document',
      'pdf': 'Document',
      'txt': 'Document',
      'rtf': 'Document',
      'xls': 'Spreadsheet',
      'xlsx': 'Spreadsheet',
      'csv': 'Spreadsheet',
      'ppt': 'Presentation',
      'pptx': 'Presentation',
      'zip': 'Archive',
      'rar': 'Archive',
      '7z': 'Archive',
      'tar': 'Archive',
      'gz': 'Archive',
      'json': 'Data',
      'xml': 'Data',
      'html': 'Web',
      'css': 'Web',
      'js': 'Script',
      'ts': 'Script',
      'php': 'Script',
      'java': 'Code',
      'c': 'Code',
      'cpp': 'Code',
      'py': 'Code',
      'go': 'Code',
      'rs': 'Code',
  };

  return fileTypes[extension] || "Unknown";
}


export function hasMaxFileSizeForChat(files : File[]) : File[]{

  return files.filter(file => file.size > MAX_FILE_SIZE_Forchat);
}
