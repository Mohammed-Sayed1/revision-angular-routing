import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from './post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postForm!: FormGroup;
  posts!: Post[];
  error = null;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });

    this.getPosts();
  }

  getPosts() {
    this.postService.fetchPosts().subscribe(
      (response) => {
        this.posts = response;
        console.log(this.posts);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  onCreatePost() {
    const postData: Post = this.postForm.value;
    /* why do must use subscribe on the http request? => becuase in angular HttpClient request returns an Observable which is must subscribe on it to make it works and send the request. */
    this.postService.createPost(postData).subscribe((response) => {
      console.log(response);
      this.getPosts();
    });
  }

  onClearPosts(event: Event) {
    event.preventDefault();
    this.postService.clearAllPosts();
    this.posts = [];
  }
}
