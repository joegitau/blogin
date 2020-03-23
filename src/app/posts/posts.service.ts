import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Post } from "./post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  private posts: Post[] = [];
  updatedPosts = new Subject<Post[]>();

  getPosts() {
    return this.posts;
  }

  getPostsAsObs() {
    return this.updatedPosts.asObservable();
  }

  addPosts(post: Post) {
    this.posts.push(post);

    this.updatedPosts.next([...this.posts]);
  }
}
