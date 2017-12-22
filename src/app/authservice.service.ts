import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthserviceService {

  constructor(private router: Router) {}
  
  token : string;
  
  isAuthenticated() {
      return this.token != null;
    }

}
