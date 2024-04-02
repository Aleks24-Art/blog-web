import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASIC_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createNewPost(data:any): Observable<any>{
    return this.http.post(BASIC_URL + '/api/v1/post/create', data);
  }

  getAllPost(): Observable<any>{
    return this.http.get(BASIC_URL + '/api/v1/post/all');
  }

  getPostByIdViewCount(id:number): Observable<any>{
    return this.http.get(BASIC_URL + `/api/v1/post/view-count/${id}`);
  }

  getPostById(id:number): Observable<any>{
    return this.http.get(BASIC_URL + `/api/v1/post/${id}`);
  }

  likePost(id:number): Observable<any>{
    return this.http.put(BASIC_URL + `/api/v1/post/like/${id}`, {});
  }
}
