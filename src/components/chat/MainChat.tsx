import ChatContainer from "@/components/chat/ChatContainer";
import ChatHead from "@/components/chat/ChatHead";
import ChatTitle from "@/components/chat/ChatTitle";
import SearchUser from "@/components/chat/SearchUser";
import VerticalDivider from "@/components/dividers/VerticalDivider";

export default function MainChat(){
    return (
        <div
        className="w-full h-full relative">
            <div
            className="absolute top-0 left-0 right-0 bottom-0 flex flex-row sm:py-4 py-2 px-4">
                <div
                className="w-full sm:w-1/3 lg:w-1/4 h-full sm:pr-4 flex flex-col gap-3">
                    <ChatTitle />
                    <SearchUser />
                    <div
                    className="w-full h-full flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                        <ChatHead />
                    </div>
                </div>
                <div
                className="hidden sm:block">
                    <VerticalDivider />
                </div>
                <div
                className="hidden sm:block sm:w-2/3 lg:w-3/4 min-h-full">
                    <ChatContainer />
                </div>
            </div>
        </div>
    );
}