

interface Props {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

export default function InputField ({ id, label, type, placeholder }: Props) {
  return (
    <div className='mb-3'>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-gray-900 mb-1'
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-md'
        placeholder={placeholder}
      />
    </div>
  );
};


