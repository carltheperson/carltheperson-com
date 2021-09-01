import { PostsList } from "../components/PostsList";

const index = () => {
  return (
    <div className="reader">
      <h1>Carl The Person</h1>
      <p>
        Check out my GitHub{" "}
        <a href="https://github.com/carltheperson">Twitter</a>
      </p>
      <h2>Posts:</h2>
      <PostsList />
    </div>
  );
};

export default index;
