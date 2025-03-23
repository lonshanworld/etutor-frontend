import { paginationOptsValidator } from "convex/server";
import {query,mutation} from "./_generated/server";
import { v } from "convex/values";

export const createMessage = mutation ({
    args : {
        conversation_id : v.number(),
        sender_id : v.number(),
        context : v.optional(v.string()),
        fileUrls : v.optional(v.array(v.string())),
    },
    handler : async (ctx, args) =>{
        await ctx.db.insert("messages", {
            conversation_id : args.conversation_id,
            sender_id : args.sender_id,
            context : args.context,
            fileUrls : args.fileUrls,
            is_read : false,
            created_at : Date.now(),
        })
    }
});


export const getMessagesByConversation = query({
    args: { 
      conversationId: v.id("conversations"),
      paginationOpts: paginationOptsValidator 
    },
    handler: async (ctx, args) => {
      return await ctx.db
        .query("messages")
        .withIndex("by_conversation_time", (q) => 
          q.eq("conversation_id", args.conversationId)
        )
        .order("desc") // Most recent messages first
        .paginate(args.paginationOpts);
    },
  });

export const markAsRead = mutation({
    args: { messageId: v.id("messages") , userId : v.number()},
    handler: async (ctx, args) => {
      const message = await ctx.db.get(args.messageId);
      // Only update if not already read
      if (message && !message.is_read && (message.sender_id !== userId)) {
        await ctx.db.patch(args.messageId, { is_read: true });
      }
    },
  });

export const deleteMessage = mutation({
    args: { messageId: v.id("messages") , userId : v.number(), sender_id : v.number()},
    handler : async(ctx, args) =>{
        if(args.userId === args.sender_id){
            await ctx.db.patch(
                args.messageId, 
                {
                    deleted_at : Date.now(),
                    context : "Message Deleted",
                    fileUrls : null,
                },
            )
        }
    }
})