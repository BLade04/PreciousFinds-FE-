// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiPrefix = 'api/v1';
// const apiDomain = 'https://delexbackendqa.azurewebsites.net';
const apiDomain = 'http://localhost:3000';

// example full URL 'https://delexbackendqa.azurewebsites.net/api/v1'
export const environment = {
  production: false,
  // apiUrl: 'https://delexbackendqa.azurewebsites.net/api/v1'
  apiUrl: apiDomain + '/' + apiPrefix
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.