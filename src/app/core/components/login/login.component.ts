import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string
  loading: boolean = false;
  error: string = null

  constructor(private router: Router) { }

  ngOnInit() {

  }

  onLoginClick() {

  }
}
