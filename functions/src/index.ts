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
  let name = event.data.after.data().name;
  // query collection and see if it is a new max stage
  // if so, update the state collection

  const stateCollection = admin.firestore().collection("state");
  const stateDoc = stateCollection.doc("maxStage");
  stateDoc.get().then((snapshot) => {
    const maxStage = snapshot.data()?.stage;
    let text = `${name} has progressed to stage ${stage}`
    if (stage && stage > maxStage) {
      text = `🚨NEW MAX STAGE🚨: ${name} has progressed to stage ${stage}`
    }
    stateDoc.set({ stage: stage });
    numbers.forEach((number) => {
      admin.firestore().collection('messages').add({
        to: `whatsapp:${number}`,
        from: `whatsapp:+14155238886`,
        body: text
      });
    });    
  });
});
