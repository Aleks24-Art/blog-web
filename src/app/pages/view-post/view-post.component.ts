import {Component} from '@angular/core';
import {PostService} from "../../service/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../service/comment.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {

  id = this.activatedRoute.snapshot.params['id'];
  postData: any;
  comments: any;
  commentForm!: FormGroup;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.token.getToken() === null) {
      this.router.navigateByUrl('/login');
      return;
    }

    console.log(this.id)
    this.getPostByIdViewCount();

    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required]
    })
  }

  createComment() {
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.id, content).subscribe(response => {
      this.matSnackBar.open("Comment Published Successfully!", "Ok");
      this.getCommentsForPost();
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok");
    });
  }

  getCommentsForPost() {
    this.commentService.getCommentsForPost(this.id).subscribe(response => {
      this.comments = response;
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok");
    })
  }


  getPostByIdViewCount() {
    this.postService.getPostByIdViewCount(this.id).subscribe(response => {
      this.postData = response;
      console.log(response);
      this.getCommentsForPost();
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok");
    })
  }

  getPostById() {
    this.postService.getPostById(this.id).subscribe(response => {
      this.postData = response;
      console.log(response);
      this.getCommentsForPost();
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok");
    })
  }

  likePost() {
    this.postService.likePost(this.id).subscribe(response => {
      this.matSnackBar.open("Post Liked Successfully!", "Ok");
      this.getPostById();
    }, error => {
      this.matSnackBar.open("Something went wrong!", "Ok");
    })
  }

}
