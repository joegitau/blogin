import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

import { Post } from "./post.model";

export interface PostData {
  message: string;
  posts: Post[];
}
@Injectable({
  providedIn: "root"
})
export class PostsService {
  private BASE_URL = "http://localhost:3000/api";
  private posts: Post[] = [];
  updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return [...this.posts];
  }

  getPostsAsObs() {
    return this.updatedPosts.asObservable();
  }

  fetchPosts(): Observable<PostData> {
    return this.http.get<PostData>(`${this.BASE_URL}/posts`);
  }

  addPosts(post: Post) {
    this.posts.push(post);

    this.updatedPosts.next([...this.posts]);
  }
}
