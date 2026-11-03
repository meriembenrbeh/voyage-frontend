// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as firebase from 'firebase/app';
import 'firebase/auth';
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyB88VoS70XXzrcO6Zaru7s87WAxm8EAsrg",
    authDomain: "angular-e-commerce-patch.firebaseapp.com",
    projectId: "angular-e-commerce-patch",
    storageBucket: "angular-e-commerce-patch.appspot.com",
    messagingSenderId: "716659165843",
    appId: "1:716659165843:web:1c049b8a7b88ef1c2b5b66"
  }
  
};
firebase.initializeApp(environment.firebase);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
