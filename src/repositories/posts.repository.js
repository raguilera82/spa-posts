import axios from "axios";

export class PostsRepository {
  async getAllPosts() {
    return await (
      await axios.get("https://jsonplaceholder.typicode.com/posts")
    ).data;
  }

  async addPost(title, body) {
    try {
      return await (
        await axios.post("https://jsonplaceholder.typicode.com/posts", {
          title,
          body,
          userId: 1,
        })
      ).data;
    } catch (err) {
      console.error(err);
    }
  }
}
