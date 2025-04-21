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
    const messageWithConversations = await ctx.db
    .query("messages")
    .withIndex("by_conversation")
    .order("desc")
    .collect();

  // Get all conversations for the user
  const userConversations = await ctx.db
    .query("conversations")
    .filter((q) =>
      q.or(
        q.eq(q.field("user1Id"), args.userId),
        q.eq(q.field("user2Id"), args.userId)
      )
    )
    .collect();

  // Create a map of conversation ID to latest message
  const latestMessagesMap = new Map();
  messageWithConversations.forEach(message => {
    if (!latestMessagesMap.has(message.conversation_id)) {
      latestMessagesMap.set(message.conversation_id, message);
    }
  });

  // Sort conversations by latest activity time
  const sortedConversations = userConversations.sort((a, b) => {
    const aMessage = latestMessagesMap.get(a._id);
    const bMessage = latestMessagesMap.get(b._id);
    
    const aTime = aMessage ? aMessage._creationTime : a._creationTime;
    const bTime = bMessage ? bMessage._creationTime : b._creationTime;
    
    return bTime - aTime; // Descending order
  });

  // Apply pagination
  const cursor = args.paginationOpts.cursor ? parseInt(args.paginationOpts.cursor) : 0;
    const start = args.paginationOpts.numItems * cursor;
    const paginatedConversations = sortedConversations.slice(
      start,
      start + args.paginationOpts.numItems
    );

    const conversationList = paginatedConversations.map(conversation => ({
      ...conversation,
      latestMessage: latestMessagesMap.get(conversation._id) || null,
    }));

    const nextCursor = start + args.paginationOpts.numItems < sortedConversations.length 
      ? (cursor + 1).toString()
      : "";

    return {
      page: conversationList,
      isDone: start + args.paginationOpts.numItems >= sortedConversations.length,
      continueCursor: nextCursor
    };
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