import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-users',
  templateUrl: './sub-users.component.html',
  styleUrls: ['./sub-users.component.scss'],
})
export class SubUsersComponent implements OnInit {
  user!: { id: number; name: string };
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.user = {
        id: data['id'],
        name: data['name'],
      };
    });
  }

  onUserEdit() {
    this.router.navigate(['/users', this.user.id, this.user.name, 'edit'], {
      /* we use queryParamsHandling: 'preserve', option to keep query params in the route(link) after redirect to EditUserComponent, and you can use it on the html tag like this => [queryParamsHandling]="'preserve'" */
      queryParamsHandling: 'preserve',
    });
  }
}
