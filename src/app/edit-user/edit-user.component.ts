/*
DeactivateGuardService
The DeactivateGuardService is an Angular service that implements the CanDeactivate interface. This interface is used to create a guard for preventing users from navigating away from a route. In this case, it is specifically designed to work with components that implement the IDeactivateGuard interface.

Methods
canDeactivate
This method is responsible for determining whether the user can navigate away from the current route. It takes the following parameters:

component: An instance of a component that implements the IDeactivateGuard interface.
currentRoute: Information about the currently activated route.
currentState: The current state of the router.
nextState: The state that the router is navigating to.
It calls the canExit method on the provided component to decide whether the navigation should proceed. The canExit method is expected to return a boolean, a Promise of a boolean, or an Observable of a boolean.

EditUserComponent
The EditUserComponent is an Angular component that implements the IDeactivateGuard interface. It represents the component associated with editing a user's information.

Properties
ngOnInit: Angular lifecycle hook method. It is called after Angular has initialized all data-bound properties of a directive. In this case, it doesn't contain any specific logic.
Methods
canExit
This method is required by the IDeactivateGuard interface and is called by the DeactivateGuardService to determine whether the user can navigate away from the current route. In this example, a confirmation prompt is shown, and the method returns true if the user confirms and false otherwise.

In summary, the provided Angular code sets up a guard (DeactivateGuardService) to control navigation away from a route based on a confirmation prompt provided by a component (EditUserComponent) that implements the necessary interface (IDeactivateGuard). The guard utilizes the canExit method of the component to make the decision.
*/

import { Component, OnInit } from '@angular/core';
import { IDeactivateGuard } from '../services/guards/deactivate-guard.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, IDeactivateGuard {
  user!: { id: string; name: string };
  editUserDetails!: { id: string; name: string };

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = {
        id: data['user']['id'],
        name: data['user']['name'],
      };

      this.editUserDetails = { ...this.user };
    });

    //////////////////////////////////////////////////////////////////////////////
    // this.route.params.subscribe((data: Params) => {
    //   this.user = {
    //     id: data['id'],
    //     name: data['name'],
    //   };

    //   this.editUserDetails = { ...this.user };
    // });
  }

  canExit() {
    console.log(this.user)
    console.log(this.editUserDetails)
    
    if(this.editUserDetails.id !== this.user.id || this.editUserDetails.name !== this.user.name) {
      if (confirm('All the changes will be lost if if you move to another page, Are you sure you want to proceed?')) {
        return true;
      } else {
        return false;
      }
    }
    
    return true;
  }
}
