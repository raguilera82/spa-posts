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

  async deletePost(postId) {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
    } catch (err) {
      console.error(err);
    }
  }

  async updatePost(postId, post) {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        title: post.heading,
        body: post.content,
        userId: 1,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
