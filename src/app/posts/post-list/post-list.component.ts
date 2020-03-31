import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, pipe } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { PostData } from "../posts.service";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts;
  successMsg: string;
  sub$: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.sub$ = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  deletePost(id: string) {
    this.postsService.delete(id).subscribe(
      () => {
        const filteredPosts = this.posts.filter((post: Post) => post.id !== id);

        this.posts = filteredPosts;
      },
      error => console.error("Its supposed to delete!", error)
    );
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
