import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, pipe } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { PostData } from "../posts.service";
import { tap } from "rxjs/operators";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: PostData;
  successMsg: string;
  sub$: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.sub$ = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  deletePost(id: string) {
    this.postsService
      .delete(id)
      .pipe(
        tap(post => console.log(`Post with post ID ${post.id} was deleted!`))
      )
      .subscribe(error => console.error("Its supposed to delete!", error));
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
