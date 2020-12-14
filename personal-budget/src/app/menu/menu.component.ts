import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  profileJson: string = null;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  }

}
