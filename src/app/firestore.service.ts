import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { ID_LOCAL_STORAGE_KEY, ID_TO_NAME } from '../constants';

const ENV = document.URL.includes('localhost') ? 'dev' : 'prod';
const LOCAL_STORAGE_KEY = 'user_hash';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  stateCollection = collection(this.firestore, 'state');
  progressCollection = collection(this.firestore, 'progress');
  curStage: number | undefined;
  userHash: string;

  constructor(public firestore: Firestore) {
    const hash = localStorage.getItem(LOCAL_STORAGE_KEY);
    this.userHash = hash ? hash : Math.random().toString(36).substring(2);
    localStorage.setItem(LOCAL_STORAGE_KEY, this.userHash);
  }
  
  getStage(): Promise<number> { 
    if (this.curStage) { 
      return new Promise((resolve) => { 
        resolve(this.curStage!); 
      }); 
    }
    if (ENV === 'dev') {
      return new Promise((resolve) => { 
        resolve(6); 
      }); 
    }
    return new Promise((resolve, reject) => { 
      const userDoc = doc(this.progressCollection, this.userHash);
      getDoc(userDoc).then((snapshot) => { 
        if (snapshot.exists()) { 
          this.curStage = snapshot.data()['stage']; 
          resolve(this.curStage!); 
        } else { 
          this.setStage(1).then(() => { 
            resolve(1); 
          }).catch((error) => { 
            reject(error); 
          }); 
        }
      }).catch((error) => { 
        reject(error); 
      });
    });
  }

  setStage(stage: number): Promise<void> { 
    this.curStage = stage;
    if (ENV === 'dev') { 
      return new Promise((resolve) => { 
        resolve(); 
      }); 
    }
    const id = window.localStorage.getItem(ID_LOCAL_STORAGE_KEY);
    let name = 'Unknown User';
    if (id && ID_TO_NAME.hasOwnProperty(id)) {
      name = ID_TO_NAME[id];
    }
    return setDoc(doc(this.progressCollection, this.userHash), {stage: stage, name: name});
  }

  canAccessStage(stage: number): Promise<boolean> { 
    return this.getStage().then((curStage) => { 
      return curStage >= stage; 
    }); 
  }

}
