import Image from "next/image";
import LinkAttachment from "@/assets/svgs/linkattachment.svg";
import SendIcon from "@/assets/svgs/Send icon.svg";
import MessageBox from "./MessageBox";


export default function ChatList(){
    return (
        <div
        className="flex flex-col h-[87%] w-full relative">
            <div
            className="absolute left-0 right-0 top-0 bottom-14 py-4 flex flex-col-reverse gap-2 overflow-y-auto scrollbar-none">
                <MessageBox 
                isMine={true}
                txt="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>
                <MessageBox 
                isMine={false}
                txt="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."/>

                

                <MessageBox 
                isMine={true}
                txt="Lorem Ipsum is simply dummy text"/>
                <MessageBox 
                isMine={false}
                txt="Lorem Ipsum is simply dummy text"/>

                <MessageBox 
                isMine={true}
                txt="Lorem Ipsum"/>
                <MessageBox 
                isMine={false}
                txt="Lorem Ipsum"/>
            </div>
            <div
            className="absolute bottom-0 left-0 right-0 border border-cusGray2 rounded-2xl flex flex-row justify-center items-center px-4 h-11">
                <input 
                placeholder="Type your message here"
                className="outline-none focus:outline-none w-full bg-transparent text-base placeholder:text-base"
                />
                <Image 
                src={LinkAttachment}
                alt="Files"/>
                <div
                className="w-[3px] h-6 rounded-t-full rounded-b-full mx-3 bg-cusGray"></div>
                <Image 
                src={SendIcon}
                alt="Send"/>
            
            </div>
        </div>
    );
}