import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { map, tap } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';

import { PostsService } from "../posts.service";
import { Post } from '../post.model';

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {
  postId: string;
  mode = 'create';
  post: Post;

  postsForm: FormGroup;

  constructor(private fb: FormBuilder,
              private postService: PostsService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postsForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.mode = 'edit';
        this.postId = params.get('id');

        this.postService.getPost(this.postId).subscribe(post => this.post = post);
        // this.postService.get(this.postId).subscribe(post => this.post = post);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  savePost() {
    if (this.postsForm.valid) {
      if (this.mode === 'edit') {
        const post: Post = {
          id: this.postsForm.value.id,
          title: this.postsForm.value.title,
          description: this.postsForm.value.description
        };

        this.postService.update(this.postsForm.value.id, post).subscribe(
          post => console.log(post),

          error => console.error('It should be updating!', error)
        );
      } else if (this.mode === 'create') {
        this.postService.create(this.postsForm.value).subscribe(
          () => this.postsForm.reset(),

          error => console.error("Definitely your fault, coz it aint us!", error)
        );
      }
    }
    return false;
  }

}
