import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject, Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Post } from "./post.model";

export interface PostData {
  message: string;
  posts: any;
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

  getAll(): Observable<PostData> {
    return this.http.get<PostData>(`${this.BASE_URL}/posts`).pipe(
      map(postData =>
        postData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            description: post.description
          };
        })
      ),
      catchError(this.handleErrors)
    );
  }

  create(post: Post) {
    return this.http
      .post<PostData>(`${this.BASE_URL}/posts`, post)
      .pipe(catchError(this.handleErrors));
  }

  addPosts(post: Post) {
    this.posts.push(post);

    this.updatedPosts.next([...this.posts]);
  }

  handleErrors(err: HttpErrorResponse) {
    return throwError({ error: err.message });
  }
}
