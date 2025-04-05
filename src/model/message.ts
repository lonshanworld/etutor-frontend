interface BaseMessage {
    _id: string;
    _creationTime: number;
    context?: string | null;
    fileUrls?: string[] | null;
    deleted_at?: number | null;
    sender_id: number;
}

interface ChatMessage extends BaseMessage {
    conversation_id: string;
    is_read: boolean;
}

interface NonChatMessage extends BaseMessage {
    deleted_at: number | null;
}

export type MessageType = ChatMessage | NonChatMessage;

export function isChatMessage(message: MessageType): message is ChatMessage {
    return 'is_read' in message;
}

