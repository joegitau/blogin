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
  updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPostsAsObs() {
    return this.updatedPosts.asObservable();
  }

  getPost(id: string): Observable<Post> {
    return this.getAll().pipe(
      map(postsData => postsData.posts.find(post => post.id === id))
    );
  }

  getAll(): Observable<PostData> {
    return this.http
      .get<PostData>(`${this.BASE_URL}/posts`)
      .pipe(catchError(this.handleErrors));
  }

  create(post: Post) {
    return this.http
      .post<PostData>(`${this.BASE_URL}/posts`, post)
      .pipe(catchError(this.handleErrors));
  }

  update(id: string, post: Post) {
    return this.http
      .put(`${this.BASE_URL}/posts/${id}`, post)
      .pipe(catchError(this.handleErrors));
  }

  delete(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.BASE_URL}/posts/${id}`);
  }

  handleErrors(err: HttpErrorResponse) {
    return throwError({ error: err.message });
  }
}
