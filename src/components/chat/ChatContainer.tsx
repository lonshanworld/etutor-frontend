import HorizontalDivider from "../dividers/HorizontalDivider";
import ChatList from "./ChatList";
import ChatProfle from "./ChatProfile";

export default function ChatContainer(){
    return(
        <div
        className="w-full h-full pl-4">
            <ChatProfle />
            <div
            className="py-3">
                <HorizontalDivider />
            </div>
            <ChatList />
        </div>
    );
}