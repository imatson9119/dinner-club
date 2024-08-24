import {
  onDocumentUpdated,

} from "firebase-functions/v2/firestore";
import admin from 'firebase-admin';

admin.initializeApp();

const numbers = ['+17087171225', '+18323643437', '+14095945718']

exports.textForMax = onDocumentUpdated("progress/{userId}", (event) => {
  if (!event.data) {
    return;
  }
  let stage = event.data.after.data().stage;
  // query collection and see if it is a new max stage
  // if so, update the state collection

  const stateCollection = admin.firestore().collection("state");
  const stateDoc = stateCollection.doc("maxStage");
  stateDoc.get().then((snapshot) => {
    const maxStage = snapshot.data()?.stage;
    if (stage && stage > maxStage) {
      stateDoc.set({ stage: stage });
      numbers.forEach((number) => {
        admin.firestore().collection('messages').add({
          to: `whatsapp:${number}`,
          from: `whatsapp:+14155238886`,
          body: `User progressed to stage ${stage}`
        });
      });    
    }
  });
});
