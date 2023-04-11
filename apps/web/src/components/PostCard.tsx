"use client";

import Link from "next/link";
import { trpc } from "../lib/trpc";
import { useRouter } from "next/navigation";

export default function PostCard({ id }: { id: string }) {
  const router = useRouter();
  const postQuery = trpc.posts.get.useQuery({ id }, { enabled: !!id });
  const deletePostMutation = trpc.posts.delete.useMutation({
    onSuccess: () => {
      router.push(`/`);
    },
  });

  if (postQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postQuery.isError) {
    return <div>Error</div>;
  }

  const deletePost = () => {
    deletePostMutation.mutate({ id });
  };

  const post = postQuery.data;

  return (
    <>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-bold leading-6 text-gray-900">
              {post.title}
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0 flex items-center space-x-4">
            <Link
              href={`/posts/${post.id}/edit`}
              className="relative inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Edit
            </Link>

            <button
              type="button"
              onClick={deletePost}
              className="relative inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 text-md">{post.content}</div>
    </>
  );
}
