import { paginationOptsValidator } from "convex/server";
import {query,mutation} from "./_generated/server";
import { v } from "convex/values";

export const createConversation = mutation({
  args: {
    user1Id: v.number(),
    user2Id: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if a conversation already exists between these users
    const existingConversation = await ctx.db
      .query("conversations")
      .filter((q) =>
        q.or(
          q.and(q.eq(q.field("user1Id"), args.user1Id), q.eq(q.field("user2Id"), args.user2Id)),
          q.and(q.eq(q.field("user1Id"), args.user2Id), q.eq(q.field("user2Id"), args.user1Id)) // Ensure bidirectional uniqueness
        )
      )
      .first();

    // If conversation exists, return its ID
    if (existingConversation) {
      return existingConversation._id ;
    }

    // Otherwise, create a new conversation
    const chatRoomId = await ctx.db.insert("conversations", {
      user1Id: args.user1Id,
      user2Id: args.user2Id,
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
        q.or(q.eq(q.field("user1Id"), args.userId), q.eq(q.field("user2Id"), args.userId))
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

export const getConversation = query({
  args : {
    id : v.optional(v.id("conversations")),
  },
  handler :async(ctx, args)=> {
    if(args.id){
      try{
        const conversation = await ctx.db.get(args.id);
        return conversation;
      }catch(err){
        return undefined;
      }
    }else{
      return undefined;
    }
  }
});