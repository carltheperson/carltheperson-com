import { PostsList } from "../components/PostsList";

export default () => {
  return (
    <div className="reader">
      <h1>Carl The Person</h1>
      <p>
        Follow me on <a href="https://twitter.com/carltheperson">Twitter</a>
      </p>
      <h2>Posts:</h2>
      <PostsList />
    </div>
  );
};
