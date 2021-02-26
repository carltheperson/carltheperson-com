export interface IPostData {
  title: string;
  content: string;
  date: string;
}

export const parsePostData = async (
  urlName: string
): Promise<IPostData | undefined> => {
  const posts = (process.env.posts as unknown) as {
    title: string;
    date: string;
    filename: string;
    urlName: string;
  }[];

  const unParsedPost = posts.find((post) => post.urlName === urlName);
  if (!unParsedPost) {
    throw new Error("Was not able to find post with url name: " + urlName);
  }

  let content: string;
  try {
    content = (await import(`../content/${unParsedPost.filename}`)).default;
  } catch {
    return undefined;
  }

  return {
    content: content,
    title: unParsedPost.title,
    date: unParsedPost.date,
  };
};
