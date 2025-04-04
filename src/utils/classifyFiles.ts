export const getFileType = (url: string): "image" | "video" | "other" => {
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) return "image";
  if (/\.(mp4|webm|ogg)$/i.test(url)) return "video";
  return "other";
};
