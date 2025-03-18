import ChatList from "@/components/chat/ChatList";
import ChatProfle from "@/components/chat/ChatProfile";
import HorizontalDivider from "@/components/dividers/HorizontalDivider";

export default function ChatBoxPage(){
    return (
        <div
        className="w-full h-full">
            <ChatProfle />
             <div
                className="py-3">
                <HorizontalDivider />
            </div>
            <ChatList />
        </div>
    );
}