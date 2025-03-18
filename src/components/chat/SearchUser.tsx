import { IoIosSearch } from "react-icons/io";


export default function SearchUser(){
    return (
        <div
        className="flex flex-row w-full h-10 rounded-md bg-background px-4 justify-center items-center">
            <input 
            placeholder="Search users"
            className="bg-transparent w-full text-base placeholder:text-base outline-none"/>
            <IoIosSearch className="text-gray-400 text-2xl"/>
        </div>
    );
}