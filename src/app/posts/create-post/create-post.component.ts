import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {
  postsForm: FormGroup;

  constructor(private fb: FormBuilder, private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", Validators.required]
    });
  }

  createPost() {
    if (this.postsForm.valid) {
      this.postsService.addPosts(this.postsForm.value);

      this.postsForm.reset();
    }
    return false;
  }
}
