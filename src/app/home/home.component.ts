/*
Note:
  - Observables doesn't related to a specific component, it works across the whole app.
  - if the observable is created inside a function that is run every time I get into the component -> this will create another observable.
  - and if the first observable is still running then will be more than one observables doing the same thing running in the same time,
  - so to solve this problem need to unsubscribe this observable when this component dies
*/
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  intervalSubscribtion!: Subscription;
  constructor() {};
  ngOnInit(): void {
    /* interval creates an Observable that emits incremented numbers every specified interval of time, on a specified,
    ust take() operator to tell interval when to stop or to unsubscribe */
    // this.intervalSubscribtion = interval(1000).pipe(take(4)).subscribe(count => {
    //   console.log(count)
    // })

    let customObservable = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count > 3) {
          observer.error('count is greater than 3')
        }
        if(count > 2) {
          observer.complete();
        }
        count++;
      }, 1000)
    })

    this.intervalSubscribtion = customObservable.pipe(map((data: number) => {
      return `count is ` + (data + 1)
    })).subscribe((data: any) => {
      console.log(data)
    }, (error: any) => {
      console.log(error)
    }, () => {
      console.log('Complete')
    })
  }


  ngOnDestroy(): void {
    this.intervalSubscribtion.unsubscribe();
  }

}
