import { paginationOptsValidator } from "convex/server";
import {query,mutation} from "./_generated/server";
import { v } from "convex/values";

export const createMessage = mutation({
  args: {
    conversation_id: v.id("conversations"),
    sender_id: v.number(),
    context: v.optional(v.string()),
    fileUrls: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      conversation_id: args.conversation_id,
      sender_id: args.sender_id,
      context: args.context,
      fileUrls: args.fileUrls,
      is_read: false,
    });
  },
});


export const getAndMarkMessagesAsRead = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.number(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // Fetch messages
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversation_id", args.conversationId)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    // Extract messages that need to be marked as read
    const unreadMessages = messages.page.filter(
      (msg) => !msg.is_read && msg.sender_id !== args.userId
    );

    // Mark messages as read
    for (const message of unreadMessages) {
      await ctx.db.patch(message._id, { is_read: true });
    }

    return messages;
  },
});


export const deleteMessage = mutation({
  args: { messageId: v.id("messages"), userId: v.number(), sender_id: v.number() },
  handler: async (ctx, args) => {
    if (args.userId !== args.sender_id) {
      throw new Error("You are not authorized to delete this message.");
    }

    return await ctx.db.patch(args.messageId, {
      deleted_at: Date.now(),
      context: "Message Deleted",
      fileUrls: [],
    });
  },
});
