import { paginationOptsValidator } from "convex/server";
import {query,mutation} from "./_generated/server";
import { v } from "convex/values";

export const createChatRoom = mutation({
    args: {
        user1 : v.object({
            userId : v.number(),
            firstName: v.string(),
            middleName : v.optional(v.string()),
            lastName:   v.optional(v.string()),
            address:   v.optional(v.string()),
            email: v.string(),
            phoneNo: v.optional(v.string()),
            dob: v.optional(v.string()),
            nationality:  v.optional(v.string()),
            passport:  v.optional(v.string()),
            profileImagePath:  v.optional(v.string()),
            status: v.optional(v.string()),
            role:  v.string(),
            gender:  v.optional(v.string()),
         
        }),
        user2 : v.object({
            userId : v.number(),
            firstName: v.string(),
            middleName : v.optional(v.string()),
            lastName:   v.optional(v.string()),
            address:   v.optional(v.string()),
            email: v.string(),
            phoneNo: v.optional(v.string()),
            dob: v.optional(v.string()),
            nationality:  v.optional(v.string()),
            passport:  v.optional(v.string()),
            profileImagePath:  v.optional(v.string()),
            status: v.optional(v.string()),
            role:  v.string(),
            gender:  v.optional(v.string()),
        
        })
    },
    handler: async (ctx, args) => {
      await ctx.db.insert("chatRooms", {
        user1 : args.user1,
        user2 : args.user2,
      });
    },
  });

  export const getChatRoomsWithLatestMessage = query({
    args: { 
      userId: v.number(),
      paginationOpts: paginationOptsValidator 
    },
    handler: async (ctx, args) => {
      // Get conversations where the user is either user1 or user2
      const conversations = await ctx.db
        .query("conversations")
        .filter(q => 
          q.or(
            q.eq(q.field("user1.userId"), args.userId),
            q.eq(q.field("user2.userId"), args.userId)
          )
        )
        .paginate(args.paginationOpts);
      
      // For each conversation, get the latest message
      const result = {
        ...conversations,
        page: await Promise.all(
          conversations.page.map(async (conversation) => {
            // Get the latest message for this conversation
            const latestMessage = await ctx.db
              .query("messages")
              .withIndex("by_conversation_time", (q ) => 
                q.eq("conversation_id", conversation._id)
              )
              .order("desc")
              .first();
            
            return {
              ...conversation,
              latestMessage
            };
          })
        )
      };
      
      return result;
    },
  });