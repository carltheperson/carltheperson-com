import React from "react";
import Link from "next/link";
import { retrievePostDataFromEnv } from "../utils/retrieve-post-data-from-env";
import { parsePostData, parsePostUrlName } from "../utils/parse-post-data";

export const PostsList = () => {
  const posts = retrievePostDataFromEnv().map((postEnvData) => {
    return {
      data: parsePostData(postEnvData.fileContents),
      urlName: parsePostUrlName(postEnvData.filename),
    };
  });

  console.log(posts.map((p) => new Date(p.data.date)));

  const sortedPosts = posts.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    return bDate.getTime() - aDate.getTime();
  });

  console.log(sortedPosts.map((p) => new Date(p.data.date)));

  return (
    <div>
      <ul>
        {sortedPosts.map((post) => {
          return (
            <li key={post.urlName}>
              <Link href={"/posts/" + post.urlName}>
                <a>
                  {post.data.title} - {post.data.date}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
