import { Component } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { slider } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider]
})
export class AppComponent {
  title = 'dinner-club';
  
  constructor(public _firestore: FirestoreService, public _router: Router, public _contexts: ChildrenOutletContexts) {
    console.log('Getting stage...');
    _firestore.getStage().then((stage) => {
      console.log('Current stage:', stage);
      _router.navigate(['/stage-' + stage]);
    }).catch((error) => {
      console.error('Error getting stage:', error);
    });
  }
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
