import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-routing';
  userAdded: boolean = false;
  userAddedSubscription!: Subscription;
  constructor(private authService: AuthService, private _userService: UserService) {}

  ngOnInit(): void {
    this.userAddedSubscription = this._userService.userAddedEvent.subscribe(data => {
      this.userAdded = data;
    })
  }

  onLoginClick() {
    this.authService.login();
  }
  onLogoutClick() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userAddedSubscription.unsubscribe();
  }
}
