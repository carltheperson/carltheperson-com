import matter from "gray-matter";

export interface IPostData {
  title: string;
  content: string;
  date: string;
}

export const parsePostData = (fileContents: string): IPostData | undefined => {
  const metaData = matter(fileContents);

  return {
    title: metaData.data.title,
    date: metaData.data.date,
    content: metaData.content,
  };
};

export const parsePostUrlName = (filename: string) => filename.split(".")[0];
