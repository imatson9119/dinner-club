import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dinner-club';
  
  constructor(_firestore: FirestoreService) {
    console.log('Getting stage...');
    _firestore.getStage().then((stage) => {
      console.log('Current stage:', stage);
    }).catch((error) => {
      console.error('Error getting stage:', error);
    });
  }
}
