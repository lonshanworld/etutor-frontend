import { Send } from "lucide-react";

const CommentBox = () => {
  return (
    <div className='flex items-center border border-gray-500 rounded-lg px-3 py-2  w-full'>
      <input
        type='text'
        placeholder='Comment...'
        className='flex-1 bg-transparent outline-none  placeholder-gray-400'
      />
      <button className='text-gray-600 transition'>
        <Send size={18} />
      </button>
    </div>
  );
};

export default CommentBox;
