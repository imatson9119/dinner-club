import { Component } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { slider } from './animations';
import { ID_LOCAL_STORAGE_KEY } from '../constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider]
})
export class AppComponent {
  title = 'dinner-club';
  
  constructor(public _firestore: FirestoreService, public _router: Router, public _contexts: ChildrenOutletContexts) {
    // Get id url param
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      window.localStorage.setItem(ID_LOCAL_STORAGE_KEY, id);
    }


    _firestore.getStage().then((stage) => {
      if (window.location.pathname !== '/stage-' + stage) _router.navigate(['/stage-' + stage]);
    }).catch((error) => {
      console.error('Error getting stage:', error);
    });
  }
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
