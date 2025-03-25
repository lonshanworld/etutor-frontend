import { paginationOptsValidator } from "convex/server";
import {query,mutation} from "./_generated/server";
import { v } from "convex/values";

export const createConversation = mutation({
  args: {
    user1: v.object({
      userId : v.number(),
      firstName: v.string(),
      middleName : v.optional(v.string()),
      lastName:   v.optional(v.string()),
      email: v.string(),
      role:  v.string(),
      profileImagePath:  v.optional(v.string()),
      gender:  v.optional(v.string()),
  }),
    user2: v.object({
      userId : v.number(),
      firstName: v.string(),
      middleName : v.optional(v.string()),
      lastName:   v.optional(v.string()),
      email: v.string(),
      role:  v.string(),
      profileImagePath:  v.optional(v.string()),
      gender:  v.optional(v.string()),
  }),
  },
  handler: async (ctx, args) => {
    // Check if a conversation already exists between these users
    const existingConversation = await ctx.db
      .query("conversations")
      .filter((q) =>
        q.or(
          q.and(q.eq(q.field("user1.userId"), args.user1.userId), q.eq(q.field("user2.userId"), args.user2.userId)),
          q.and(q.eq(q.field("user1.userId"), args.user2.userId), q.eq(q.field("user2.userId"), args.user1.userId)) // Ensure bidirectional uniqueness
        )
      )
      .first();

    // If conversation exists, return its ID
    if (existingConversation) {
      return existingConversation._id ;
    }

    // Otherwise, create a new conversation
    const chatRoomId = await ctx.db.insert("conversations", {
      user1: args.user1,
      user2: args.user2,
    });

    return chatRoomId;
  },
});


export const getConversationsWithLatestMessage = query({
  args: {
    userId: v.number(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // Fetch conversations where the user is either user1 or user2
    const conversations = await ctx.db
      .query("conversations")
      .filter((q) =>
        q.or(q.eq(q.field("user1.userId"), args.userId), q.eq(q.field("user2.userId"), args.userId))
      )
      .paginate(args.paginationOpts);

    // Fetch latest messages per conversation
    const conversationList = await Promise.all(
      conversations.page.map(async (conversation) => {
        const latestMessage = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) =>
            q.eq("conversation_id", conversation._id)
          )
          .order("desc")
          .first();

        return {
          ...conversation,
          latestMessage: latestMessage || null, // Return null if no messages exist
        };
      })
    );

    return { ...conversations, page: conversationList };
  },
});
