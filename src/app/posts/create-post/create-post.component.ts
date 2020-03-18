import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { Post } from "../post.model";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {
  enteredTitle: string = "";
  enteredDescription: string = "";

  @Output() createdPost = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  createPost() {
    const post: Post = {
      title: this.enteredTitle,
      description: this.enteredDescription
    };

    this.createdPost.emit(post);
  }
}
