import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { PostData } from "../posts.service";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  successMsg: string;
  sub$: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.sub$ = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
