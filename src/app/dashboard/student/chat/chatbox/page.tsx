import ChatList from "@/components/chat/ChatList";
import ChatProfle from "@/components/chat/ChatProfile";
import HorizontalDivider from "@/components/dividers/HorizontalDivider";

export default function ChatBoxPage(){
    return (
        <div
        className="w-full h-full relative">
            <div
            className="absolute top-0 left-0 right-0 bottom-0 flex flex-col pt-4 sm:pt-0 px-4 sm:pr-0">
                <ChatProfle />
                <div
                    className="py-3">
                    <HorizontalDivider />
                </div>
                <ChatList />
            </div>
        </div>
    );
}