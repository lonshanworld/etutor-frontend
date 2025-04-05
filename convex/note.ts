import { paginationOptsValidator } from "convex/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createNote = mutation({
    args : {
        sender_id : v.number(),
        context : v.optional(v.string()),
        fileUrls : v.optional(v.array(v.string())),
    },
    handler : async (ctx, args) => {
        return await ctx.db.insert("notes", {
            sender_id : args.sender_id,
            context : args.context,
            fileUrls : args.fileUrls,
        });
    }
});

export const getNotes = query({
    args : {
        senderId : v.number(),
        paginationOpts : paginationOptsValidator,
    },
    handler : async (ctx, args) => {    
        // Fetch paginated notes
        const notes = await ctx.db
            .query("notes")
            .withIndex("by_sender", (q) =>
                q.eq("sender_id", args.senderId)
            )
            .order("desc")
            .paginate(args.paginationOpts);

        return notes;
    }
})

export const deleteNote = mutation({
    args : {
        noteId : v.id("notes"),
    },
    handler : async (ctx, args) => {
        return await ctx.db.patch(args.noteId,{
            deleted_at: Date.now(),
            context: "Note Deleted",
            fileUrls: [],
        });
    }
})