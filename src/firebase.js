import firebase from 'firebase/app';
import 'firebase/firestore';
// require('dotenv').config();

var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY
    ? process.env.REACT_APP_APIKEY
    : process.env.APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN
    ? process.env.REACT_APP_AUTHDOMAIN
    : process.env.AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID
    ? process.env.REACT_APP_PROJECTID
    : process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKED
    ? process.env.REACT_APP_STORAGEBUCKED
    : process.env.STORAGEBUCKED,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID
    ? process.env.REACT_APP_MESSAGINGSENDERID
    : process.env.MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
    ? process.env.REACT_APP_APPID
    : process.env.APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
    ? process.env.REACT_APP_MEASUREMENTID
    : process.env.MEASUREMENTID,
};

//firebase config 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const db = firebase.firestore().collection('korello');
const FieldValue = firebase.firestore.FieldValue;

export const getDocuments = async arr => {
  const responseData = await db.get();
  const docList = responseData.docs.map(el => el.id);
  console.log('firebase board list: ', docList);
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
    // console.log('fb field raw data: ', dataList);
    if (Object.keys(dataList).length > 0) {
      for (let key in dataList) {
        result.push(dataList[key]);
      }

      const data = result
        .sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
        .map(el => el.name);
      // console.log('tag list: ', data);
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
