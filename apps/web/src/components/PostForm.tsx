"use client";

import { useRouter } from "next/navigation";
import { trpc } from "../lib/trpc";

export default function PostForm({ id }: { id?: string }) {
  const router = useRouter();
  const utils = trpc.useContext();
  const postQuery = trpc.posts.get.useQuery({ id }, { enabled: !!id });
  const updatePostMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      utils.posts.invalidate();
      router.push(`/posts/${id}`);
    },
  });
  const createPostMutation = trpc.posts.create.useMutation({
    onSuccess: () => {
      utils.posts.invalidate();
    },
  });

  const createPost = (e: any) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    createPostMutation.mutate({ title, content });

    e.target.reset();
  };

  const updatePost = (e: any) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    updatePostMutation.mutate({ id, title, content });

    e.target.reset();
  };

  if (id && postQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (id && postQuery.error) {
    return <div>{postQuery.error.message}</div>;
  }

  return (
    <form onSubmit={id ? updatePost : createPost} className="relative mt-5">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 py-2.5 px-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Title"
          defaultValue={postQuery.data?.title}
        />
        <label htmlFor="content" className="sr-only">
          Content
        </label>
        <textarea
          rows={id ? 10 : 6}
          name="content"
          id="content"
          className="block w-full border-top resize-none px-2.5 border-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Write a message..."
          defaultValue={postQuery.data?.content}
        />

        <div className="mb-14" />
      </div>

      <div className="absolute inset-x-px bottom-0 bg-white">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}

        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex"></div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {id ? "Update" : "Create"} Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
