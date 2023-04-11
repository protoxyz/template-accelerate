import { publicProcedure, router } from "../lib/trpc";
import { p } from "../lib/db";
import { z } from "zod";

const PostObject = z.object({
  id: z.string().cuid(),
  title: z.string(),
  content: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export default router({
  list: publicProcedure
    .meta({
      summary: "List all posts",
      description: "List all posts",
      method: "GET",
      path: "/posts",
      tags: ["Post"],
    })
    .input(z.undefined())
    .output(z.array(PostObject))
    .query(async ({}) => {
      return await p.post.findMany();
    }),

  get: publicProcedure
    .meta({
      summary: "Get a post",
      description: "Get a post",
      method: "GET",
      path: "/posts/{id}",
      tags: ["Post"],
    })
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .output(PostObject.nullable())
    .query(async ({ input }) => {
      const { id } = input;
      return await p.post.findUnique({
        where: {
          id,
        },
      });
    }),

  create: publicProcedure
    .meta({
      summary: "Create a new post",
      description: "Create a new post",
      method: "POST",
      path: "/posts",
      tags: ["Post"],
    })
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .output(PostObject)
    .mutation(async ({ input }) => {
      const { title, content } = input;
      return await p.post.create({
        data: {
          title,
          content,
        },
      });
    }),

  update: publicProcedure
    .meta({
      summary: "Update a post",
      description: "Update a post",
      method: "PUT",
      path: "/posts/{id}",
      tags: ["Post"],
    })
    .input(
      z.object({
        id: z.string().cuid(),
        title: z.string(),
        content: z.string(),
      })
    )
    .output(PostObject)
    .mutation(({ input }) => {
      const { id, title, content } = input;
      return p.post.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });
    }),

  delete: publicProcedure
    .meta({
      summary: "Delete a post",
      description: "Delete a post",
      method: "DELETE",
      path: "/posts/{id}",
      tags: ["Post"],
    })
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ input }) => {
      const { id } = input;
      const result = await p.post.delete({
        where: {
          id,
        },
      });

      return true;
    }),
});
