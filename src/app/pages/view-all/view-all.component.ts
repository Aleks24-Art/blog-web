import { Component } from '@angular/core';
import {PostService} from "../../service/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {

  allPosts:any;

  constructor(private postService: PostService,
              protected snackBar: MatSnackBar,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.token.getToken() === null) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPost().subscribe(response => {
      console.log(response);
      this.allPosts = response;
    }, error => {
      this.snackBar.open("Something went wrong!", "Ok");
    })
  }

}
