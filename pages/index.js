import { PostsList } from '../components/PostsList'

function Homepage() {
  return (
      <div style={{padding: "20px", margin: "auto", width: "750px"}}>
          <h1>Carl The Person</h1>
          <p>Follow me on <a href="https://twitter.com/carltheperson">Twitter</a></p>
          <h2>Posts:</h2>
          <PostsList/>
      </div>
  )
}

export default Homepage
