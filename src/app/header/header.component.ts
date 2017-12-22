import { Component, EventEmitter, Output } from '@angular/core';
import {AuthserviceService} from '../authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private authService: AuthserviceService){}
}
