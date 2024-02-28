/**
 * @typedef {Object} PostType
 * @property {string} postId
 * @property {string} heading
 * @property {string} content
 */
export class Post {
  /**
   * @constructor
   * @param {PostType} post
   */
  constructor({ postId, heading, content }) {
    this.postId = postId;
    this.heading = heading;
    this.content = content;
  }
}
