import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    conversations: defineTable({
        user1 : v.object({
            userId : v.number(),
            firstName: v.string(),
            middleName : v.optional(v.string()),
            lastName:   v.optional(v.string()),
            email: v.string(),
            role:  v.string(),
            profileImagePath:  v.optional(v.string()),
            gender:  v.optional(v.string()),
        }),
        user2 : v.object({
            userId : v.number(),
            firstName: v.string(),
            middleName : v.optional(v.string()),
            lastName:   v.optional(v.string()),
            email: v.string(),
            role:  v.string(),
            profileImagePath:  v.optional(v.string()),
            gender:  v.optional(v.string()),
        }),
    }),
    messages : defineTable({
        conversation_id : v.id("conversations"),
        sender_id : v.number(),
        context : v.optional(v.string()),
        fileUrls : v.optional(v.array(v.string())),
        is_read : v.boolean(),
        deleted_at : v.optional(v.number()),
    }).index("by_conversation", ["conversation_id"]),
});
