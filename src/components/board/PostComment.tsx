import Image from "next/image";
import placeholderProfile from "@/assets/images/placeholder-profile.png";

interface Props {
  username: string;
  profilePic: string;
  time: string;
  comment: string;
}
const PostComment = ({ username, profilePic, time, comment }: Props) => {
  return (
    <div className='my-3'>
      <div className='flex gap-2 items-center'>
        <div className='w-10 h-10 rounded-full overflow-hidden'>
          <Image
            src={profilePic || placeholderProfile}
            alt={`${username}'s profile`}
            width={40}
            height={40}
            className='object-cover'
          />
        </div>
        <p className='font-semibold text-sm'>{username}</p>
        <p className='text-xs'>{time}</p>
      </div>
      <div className='ml-11 w-10/12 flex'>
        <div className='bg-white p-2 rounded-sm text-sm'>{comment}</div>
      </div>
    </div>
  );
};

export default PostComment;
