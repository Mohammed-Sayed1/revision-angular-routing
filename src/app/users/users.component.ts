/*
to implement navigation programmaticlly:
  1. need to inject Router in constructor, which implementing routing concept
  2. use Router methods in the method that will excute when the button clicked
*/
/*
to manepolate the link itself:
  1. need to inject ActivatedRoute in constructor, which is current route(link)
  2. 
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  /* note: we use '!' to tell typescript trust me I'll intialize the user property */
  user!: {id: string, name: string};

  constructor(private router: Router, private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
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
