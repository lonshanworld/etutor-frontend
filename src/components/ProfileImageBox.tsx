import Image from "next/image";

export default function ProfileImageBox() {
  return (
    <div className="w-11 h-11 rounded-full bg-secondaryBackground relative overflow-clip">
      <Image
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pBfUzg3ft35hIK4QEw0w9qA_vYUTpSYWRQ&s"
        }
        fill={true}
        alt="Profile"
        className="absolute object-cover"
   
      />
    </div>
  );
}
