import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {
  inputValue: string = "";

  constructor() {}

  ngOnInit(): void {}

  createPost() {
    console.log(this.inputValue);
  }
}