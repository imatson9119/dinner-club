import { Injectable } from '@angular/core';
import { collection, doc, documentId, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';

const ENV = document.URL.includes('localhost') ? 'dev' : 'prod';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: Firestore) { }
  stateCollection = collection(this.firestore, 'state');
  cs: number | undefined;

  gs(): Promise<number> { 
    if (this.cs) { 
      return new Promise((resolve) => { 
        resolve(this.cs!); 
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

  ss(stage: number): Promise<void> { 
    this.cs = stage;
    if (ENV === 'dev') { 
      return new Promise((resolve) => { 
        resolve(); 
      }); 
    }
    return setDoc(doc(this.stateCollection, 'progress'), { stage: stage });
  }

  cas?(stage: number): Promise<boolean> { 
    return this.gs().then((cs) => { 
      return cs >= stage; 
    }); 
  }

}
