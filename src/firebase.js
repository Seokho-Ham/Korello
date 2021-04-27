import firebase from 'firebase/app';
import 'firebase/firestore';
require('dotenv').config();

var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.STORAGEBUCKED,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

//firebase config 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const db = firebase.firestore().collection('korello');
const FieldValue = firebase.firestore.FieldValue;

export const setFirebaseDocuments = async arr => {
  const responseData = await db.get();
  const docList = responseData.docs.map(el => el.id);
  arr.forEach(async el => {
    if (!docList.includes(el.id)) {
      await db.doc(el.id).set({});
    }
  });
};

export const getFields = async boardId => {
  const responseData = await db.doc(boardId).get();

  if (!responseData.exists) {
    console.log('No Document');
  } else {
    const dataList = responseData.data();

    let result = [];
    if (Object.keys(dataList).length > 0) {
      for (let key in dataList) {
        result.push(dataList[key]);
      }

      const data = result
        .sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
        .map(el => el.name);
      return data;
    } else {
      return result;
    }
  }
};

export const setFirebaseData = async (boardId, data) => {
  await db.doc(boardId).set(data ? data : null, { merge: true });
};
export const deleteFirebaseDoc = async boardId => {
  await db.doc(boardId).delete();
};
export const deleteFirebaseField = async (boardId, tagValue) => {
  const doc = db.doc(boardId);
  await doc.update({ [tagValue]: FieldValue.delete() });
};
