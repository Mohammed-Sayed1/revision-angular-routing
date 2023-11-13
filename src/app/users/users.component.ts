/*
to implement navigation programmaticlly:
  1. need to inject Router in constructor
  2. use Router methods in the method that will excute when the button clicked
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private router: Router) {};

  ngOnInit(): void {
    
  }

  onCategoriesClick() {
    // perform some logic
    // navigate to page

    /* use navigateByUrl when writing path staticlly */
    this.router.navigateByUrl('/categories');

    /* use navigate when writing path dynamiclly */
    // this.router.navigate(['/categories', id])
  }

}
