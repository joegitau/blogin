import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Post } from "./post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    return this.posts;
  }

  addPosts(post: Post) {
    return this.posts.push(post);
  }
}
