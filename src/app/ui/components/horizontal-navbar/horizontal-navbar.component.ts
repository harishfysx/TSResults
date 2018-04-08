import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'horizontal-navbar',
  templateUrl: 'horizontal-navbar.component.html',
  styleUrls: ['horizontal-navbar.component.scss'],
  host: {
    '[class.app-navbar]': 'true',
    '[class.show-overlay]': 'showOverlay'
  }
})
export class HorizontalNavbarComponent implements OnInit , OnDestroy{
  @Input() title: string;
  @Input() openedSidebar: boolean;
  @Output() sidebarState = new EventEmitter();
  showOverlay: boolean;
  // IRART variables
   logOutSubscription: Subscription;
   loggedInUser: string;
   isLoggedIn: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
    this.openedSidebar = false;
    this.showOverlay = false;
  }

  ngOnInit() {
    const isAuthenticated = this.authService.isAuthenticated().subscribe((value) => {
      this.isLoggedIn = value;
    });
    if (this.isLoggedIn) {
      const currentUser = this.authService.getAuthenticatedUser().getUsername();
      this.loggedInUser = currentUser;
    }
  }

  open(event) {
    const clickedComponent = event.target.closest('.nav-item');
    const items = clickedComponent.parentElement.children;

    event.preventDefault();

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }
    clickedComponent.classList.add('opened');

    // Add class 'show-overlay'
    this.showOverlay = true;
  }

  close(event) {
    const clickedComponent = event.target;
    const items = clickedComponent.parentElement.children;

    event.preventDefault();

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }

    // Remove class 'show-overlay'
    this.showOverlay = false;
  }

  openSidebar() {
    this.openedSidebar = !this.openedSidebar;
    this.sidebarState.emit();
  }
  // Implement LogOut
  onLogOut () {
   this.logOutSubscription = this.authService.logOut().subscribe({
     complete : () => {
       this.router.navigate(['/landing/search']);
     }
   });
  }
  // Implement OnDestroy
  ngOnDestroy(): void {
    this.logOutSubscription.unsubscribe(); // un-subscribe  from logout subscription
  }

}
