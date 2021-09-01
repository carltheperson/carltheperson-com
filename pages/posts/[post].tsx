import React from "react";
import ReactMarkdown from "react-markdown";

import { Header } from "../../components/Header";
import { Email } from "../../components/Email";
import { CodeBlock } from "../../components/CodeBlock";
import {
  IPostData,
  parsePostData,
  parsePostUrlName,
} from "../../utils/parse-post-data";
import { retrievePostDataFromEnv } from "../../utils/retrieve-post-data-from-env";

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
        Check out my <a href="https://github.com/carltheperson">GitHub</a> and
        my <a href="https://twitter.com/carltheperson">Twitter</a>
      </p>
      <Email />
    </div>
  );
};
export default DefaultPostTemplate;

export async function getStaticPaths() {
  const paths = retrievePostDataFromEnv().map((postData) => ({
    params: { post: parsePostUrlName(postData.filename) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postEnvData = retrievePostDataFromEnv().find(
    (postData) => parsePostUrlName(postData.filename) === params.post
  );

  const postData = parsePostData(postEnvData.fileContents);

  return {
    props: { postData },
  };
}
