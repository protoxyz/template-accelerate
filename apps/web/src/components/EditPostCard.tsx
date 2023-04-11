"use client";

import Link from "next/link";
import { trpc } from "../lib/trpc";
import { useRouter } from "next/navigation";

export default function EditPostCard({ id }: { id: string }) {
  const router = useRouter();
  const postQuery = trpc.posts.get.useQuery({ id }, { enabled: !!id });
  const updatePostMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      router.push(`/posts/${id}`);
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    updatePostMutation.mutate({ id, title, content });
  };

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Edit Post
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600"></p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 bg-white p-5">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    defaultValue={postQuery.data?.title}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  defaultValue={postQuery.data?.content}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600"></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </div>
    </form>
  );
}
