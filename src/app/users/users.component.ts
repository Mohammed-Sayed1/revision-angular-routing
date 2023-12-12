/*
to implement navigation programmaticlly:
  1. need to inject Router in constructor, which implementing routing concept
  2. use Router methods in the method that will excute when the button clicked
*/
/*
to manepolate the link itself:
  1. need to inject ActivatedRoute in constructor, which is current route(link)
  2. then extract what you need from the route to use it
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  /* note: we use '!' to tell typescript trust me I'll intialize the user property */
  user!: { id: string; name: string };

  constructor(private router: Router, private route: ActivatedRoute, private _userService: UserService) {}

  ngOnInit(): void {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    /* there is a problem that we assigning user in ngOnInit() hook which means user will be assigned once when the component initiat first, so this is how to listen to route(link) data and update user */
    this.route.params.subscribe((data: Params) => {
      this.user = {
        id: data['id'],
        name: data['name'],
      };
    });

    /* this is how we fetch query params and fragment form the route(link) using snapshot */
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    /* this is how we fetch query params and fragment form the route(link) using subscribe */
    this.route.queryParams.subscribe((data) => {
      console.log(data);
    });
    this.route.fragment.subscribe((data) => {
      console.log(data);
    });
  }

  onCategoriesClick() {
    // perform some logic
    // navigate to page

    /* use navigateByUrl when writing path staticlly */
    this.router.navigateByUrl('/categories');

    /* use navigate when writing path dynamiclly */
    // this.router.navigate(['/categories', id])
  }

  getHanyDetails() {
    /* this is how we add query params and fragment to the route(link) programmaticlly */
    this.router.navigate(['/users', 2, 'Hany'], {
      queryParams: { page: 7, search: 'hany' },
      fragment: 'searching',
    });
  }

  onUserAddClick() {
    this._userService.addUser()
  }
  
}
