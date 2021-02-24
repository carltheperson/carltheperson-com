import React from "react";
import Link from "next/link";

export const PostsList = () => {
  const posts = process.env.posts;

  return (
    <div>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.urlName}>
              <Link href={"/posts/" + post.urlName}>
                <a>
                  {post.title} - {post.date}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
