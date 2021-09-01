import { PostsList } from "../components/PostsList";

const index = () => {
  return (
    <div className="reader">
      <h1>Carl The Person</h1>
      <p>
        Check out my <a href="https://github.com/carltheperson">GitHub</a>
      </p>
      <h2>Posts:</h2>
      <PostsList />
    </div>
  );
};

export default index;
