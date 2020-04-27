import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD44_kHogTAQZHWvMvjXOLMkIVxtBE4i7E",
    authDomain: "art-crawl-houston.firebaseapp.com",
    databaseURL: "https://art-crawl-houston.firebaseio.com",
    projectId: "art-crawl-houston",
    storageBucket: "art-crawl-houston.appspot.com",
    messagingSenderId: "1047183387249",
    appId: "1:1047183387249:web:ed77b38837f06ee90449d0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
export default db;