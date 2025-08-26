import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IUser} from "../../user/user.model";
import {UserService} from "../../user/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss'
})
export class SiteHeaderComponent implements OnInit{
  user: IUser | null = null;
  showSignOutMenu: boolean = false;

  constructor(
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.userservice.getUser().subscribe({
      next: (user) => this.user = user
    });
    }
  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }
  signOut() {
    this.userservice.signOut();
    this.showSignOutMenu = false;
  }
}
