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


export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // Fetch paginated messages
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversation_id", args.conversationId)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    return messages;
  },
});

export const markMessagesAsRead = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.number(),
  },
  handler: async (ctx, args) => {
    // Fetch all messages first
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversation_id", args.conversationId)
      )
      .collect(); // Convert from FilterBuilder to an array

    // Now, filter messages that are unread and not sent by the current user
    const unreadMessages = messages.filter(
      (msg) => !msg.is_read && msg.sender_id !== args.userId
    );

    // Mark messages as read
    for (const message of unreadMessages) {
      await ctx.db.patch(message._id, { is_read: true });
    }

    return { success: true };
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

export const getMessageCountBySender = mutation({
  args: {
    senderId: v.number(),
    timeRange: v.optional(v.string()),
  },
  handler: async (ctx, { senderId, timeRange }) => {
    let query = ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("sender_id"), senderId));

    if (timeRange) {
      const now = Date.now();
      const daysAgo = timeRange === "7d" ? 7 : timeRange === "28d" ? 28 : 0;
      if (daysAgo > 0) {
        const sinceTimestamp = now - daysAgo * 24 * 60 * 60 * 1000;
        query = query.filter((q) =>
          q.gte(q.field("_creationTime"), sinceTimestamp)
        );
      }
    }

    const messages = await query.collect();
    return messages.length;
  },
});