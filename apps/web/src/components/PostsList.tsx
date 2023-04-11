"use client";

import Link from "next/link";
import { Inputs, trpc } from "../lib/trpc";

export default function PostsList() {
  const postsQuery = trpc.posts.list.useQuery({});

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 mt-5 rounded-lg overflow-hidden"
    >
      {postsQuery.data?.map((post) => (
        <li
          key={post.id}
          className="relative bg-white px-4 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
        >
          <Link href={`/posts/${post.id}`}>
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="truncate text-sm font-medium text-gray-900">
                  {/* {post.sender} */}
                </p>
                <p className="truncate text-sm text-gray-900 font-semibold">
                  {post.title}
                </p>
              </div>
              <time
                dateTime={post.createdAt.toLocaleString()}
                className="flex-shrink-0 whitespace-nowrap text-sm text-gray-300"
              >
                {post.createdAt.toLocaleString()}
              </time>
            </div>
            <div className="mt-1">
              <p className="line-clamp-2 text-sm text-gray-600">
                {post.content}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
