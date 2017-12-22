import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'employees';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
    console.log('Feature selected = ' + this.loadedFeature);
  }
}
