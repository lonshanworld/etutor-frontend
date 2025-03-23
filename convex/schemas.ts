import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    conversations: defineTable({
        id : v.id("conversations"),
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
    }),
    messages : defineTable({
        id : v.id("messages"), 
        conversation_id : v.id("conversations"),
        sender_id : v.number(),
        context : v.optional(v.string()),
        fileUrls : v.optional(v.array(v.string())),
        is_read : v.boolean(),
        created_at : v.number(),
        deleted_at : v.optional(v.number()),
    }).index("by_conversation_time", ["conversation_id", "created_at"]),
});
