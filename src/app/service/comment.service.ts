import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASIC_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(postId: number, content: string): Observable<any> {
    const params = {
      postId: postId
    }

    return this.http.post(BASIC_URL + '/api/v1/comment/create', content, {params});
  }

  getCommentsForPost(postId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/api/v1/comment/comments/${postId}`);
  }
}
