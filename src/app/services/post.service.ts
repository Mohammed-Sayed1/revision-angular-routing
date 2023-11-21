import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { map, tap } from 'rxjs';

/* to make this service available across all components => use @Injectable decorator like below or add this service inside providers array in app.module.ts */
@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  fetchPosts() {
    /* there're 3 ways to add query params to the url showen below */
    /* 1st way: is to assign new HttpParams() to a variable, and use append to add query params to the url, and use it as a value for params property inside options object */
    /* 2nd way: is to assign new HttpParams().set('custom', 'hi') to params property inside options object */
    /* 3rd way: is to add query params directly to the url like this -> 'https://angular-interceptor-3c67b-default-rtdb.firebaseio.com/posts.json?custom=hi&another=hi' */
    let searchParams = new HttpParams();
    searchParams = searchParams.append('custom', 'hi');
    searchParams = searchParams.append('another', 'hi');

    /*
    Observable as a Stream: An Observable is like a continuous stream of data that can emit values over time. It could be data from user interactions, API calls, or any asynchronous source.

    Subscribe as the Endpoint: When you subscribe to an Observable, you are essentially setting up a listener at the end of the stream. This is where you receive and react to the data emitted by the Observable.

    Pipe for Transformation: The pipe method is used to apply a sequence of operators to the Observable before it reaches the subscriber. These operators can transform, filter, or manipulate the data in various ways.
    */
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-interceptor-3c67b-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({
            'custom-header': 'Get Mohammed',
          }),
          params: searchParams,
          // params: new HttpParams().set('custom', 'hi'),
        }
      )
      .pipe(
        /* use map operator to modify the reponse date */
        map((response) => {
          let posts: Post[] = [];
          for (const key in response) {
            posts.push({ ...response[key], key });
          }
          return posts;
        })
      );
  }

  createPost(postData: Post) {
    return this.http.post<{ name: string }>(
      'https://angular-interceptor-3c67b-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        headers: new HttpHeaders({
          'custom-header': 'Post Mohammed',
        }),
        /* use observe: 'response' to tell the server in case of post request to send back the whole response object not just its body by default */
        observe: 'response',
      }
    );
  }

  clearAllPosts() {
    this.http
      .delete(
        'https://angular-interceptor-3c67b-default-rtdb.firebaseio.com/posts.json', {
          /* events means the change in response.type */
          observe: 'events',
          /* responseType by default is 'json', but the below will change the response.body value to string */
          responseType: 'text'
        }
      )
      /* use tap operator to add logic but no to modify the response the reponse date */
      .pipe(tap((response) => {
        /* every property inside HttpEventType object has a value from 0 to 5, which are represent the stages of request */
        if(response.type === HttpEventType.Sent) {
          console.log("request sent")
        }

        if(response.type === HttpEventType.Response) {
          console.log(response)
        }
      }))
      .subscribe((response) => {
        console.log("inside clearAllPosts subscribe : ", response)
      });
  }
}
