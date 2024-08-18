import { Injectable } from '@angular/core';
import { collection, doc, documentId, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';

const ENV = document.URL.includes('localhost') ? 'dev' : 'prod';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: Firestore) { }
  stateCollection = collection(this.firestore, 'state');
  curStage: number | undefined;

  getStage(): Promise<number> { 
    if (this.curStage) { 
      return new Promise((resolve) => { 
        resolve(this.curStage!); 
      }); 
    }
    if (ENV === 'dev') { 
      return new Promise((resolve) => { 
        resolve(0); 
      }); 
    }
    return new Promise((resolve, reject) => { 
      const q = query(this.stateCollection, where(documentId(), "==", "progress")); 
      getDocs(q).then((querySnapshot) => { 
        querySnapshot.forEach((doc) => { 
          resolve(doc.data()['stage']); 
        }); 
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
    return setDoc(doc(this.stateCollection, 'progress'), { stage: stage });
  }

  canAccessStage(stage: number): Promise<boolean> { 
    return this.getStage().then((curStage) => { 
      return curStage >= stage; 
    }); 
  }

}
