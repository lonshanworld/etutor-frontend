import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    conversations: defineTable({
        user1Id : v.number(),
        user2Id : v.number(),
    }).index("by_users", ["user1Id", "user2Id"]),
    messages : defineTable({
        conversation_id : v.id("conversations"),
        sender_id : v.number(),
        context : v.optional(v.string()),
        fileUrls : v.optional(v.array(v.string())),
        is_read : v.boolean(),
        deleted_at : v.optional(v.number()),
    }).index("by_conversation", ["conversation_id"]),
    notes : defineTable({
        sender_id : v.number(),
        context : v.optional(v.string()),
        fileUrls : v.optional(v.array(v.string())),
        deleted_at : v.optional(v.number()),
    }).index("by_sender", ["sender_id"]),
});
