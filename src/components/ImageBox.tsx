import Image from "next/image";
import placeholderProfile from "@/assets/images/placeholder-profile.png";


export default function ImageBox(
    {
        imageUrl
    } : {
        imageUrl? : string | null,
    }
) {


  return (
    <div
      className="w-11 h-11 rounded-full bg-secondaryBackground relative overflow-clip cursor-pointer"
    >
      <Image
        src={
          imageUrl ? imageUrl : placeholderProfile
        }
        fill={true}
        alt="Profile"
        className="absolute object-cover"
      />
    </div>
  );
}
