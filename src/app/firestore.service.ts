import { Injectable } from '@angular/core';
import { collection, doc, documentId, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';

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
    // if (ENV === 'dev') { 
    //   return new Promise((resolve) => { 
    //     resolve(2); 
    //   }); 
    // }
    if (this.curStage) { 
      return new Promise((resolve) => { 
        resolve(this.curStage!); 
      }); 
    }
    return new Promise((resolve, reject) => { 
      const userDoc = doc(this.progressCollection, this.userHash);
      getDoc(userDoc).then((snapshot) => { 
        if (snapshot.exists()) { 
          this.curStage = snapshot.data()['stage']; 
          resolve(this.curStage!); 
        } else { 
          this.setStage(0).then(() => { 
            resolve(0); 
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
    // if (ENV === 'dev') { 
    //   return new Promise((resolve) => { 
    //     resolve(); 
    //   }); 
    // }
    this.curStage = stage;
    return setDoc(doc(this.progressCollection, this.userHash), {stage: stage});
  }

  canAccessStage(stage: number): Promise<boolean> { 
    return this.getStage().then((curStage) => { 
      return curStage >= stage; 
    }); 
  }

}
