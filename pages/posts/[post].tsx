import React from "react";
import ReactMarkdown from "react-markdown";

import { Header } from "../../components/Header";
import { Email } from "../../components/Email";
import { CodeBlock } from "../../components/CodeBlock";
import { parsePostData } from "../../utils/parsePostList";
import { IPostData } from "../../utils/parsePostList";

interface DefaultPostTemplateProps {
  postData: IPostData;
}

const DefaultPostTemplate = ({ postData }: DefaultPostTemplateProps) => {
  return (
    <div className={"reader "}>
      <Header />
      <h1>{postData.title}</h1>
      <p>
        <i>{postData.date} Carl Riis</i>
      </p>
      <ReactMarkdown
        renderers={{ code: CodeBlock }}
        source={postData.content}
      />
      <hr />

      <p style={{ textAlign: "center" }}>
        Follow me on <a href="https://twitter.com/carltheperson">Twitter</a>
      </p>
      <Email />
    </div>
  );
};
export default DefaultPostTemplate;

export async function getStaticPaths() {
  const posts = (process.env.posts as unknown) as { urlName: string }[];

  const paths = posts.map((post) => ({
    params: { post: post.urlName },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { postData: await parsePostData(params.post) } };
}
