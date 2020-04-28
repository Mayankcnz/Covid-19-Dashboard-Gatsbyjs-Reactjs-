// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_HOST = 'https://corona.lmao.ninja/v2';

// const ENDPOINTS = [
//   {
//     id: 'all',
//     path: '/all',
//     isDefault: true
//   },
//   {
//     id: 'countries',
//     path: '/countries'
//   }
// ]

// // defaultl data and ready state for request
// const defaultState = {
//   data: null,
//   state: 'ready'
// }

// /**
//  * we are goona find a route given the argument. we will set up in a
//  * second. if it doesn't find that route , we goona default to one we set above
//  *
//  * @param {} param0
//  */
// const useTracker = ({ api = 'all' }) => {

//   const [tracker = {}, updateTracker] = useState(defaultState)

//   async function fetchTracker() {
//     let route = ENDPOINTS.find(({ id } = {}) => id === api);

//     if ( !route ) {
//       route = ENDPOINTS.find(({ isDefault } = {}) => !!isDefault);
//     }

//     let response;

//     try {
//       updateTracker((prev) => {
//         return {
//           ...prev,
//           state: 'loading'
//         }
//       });

//       // make the reuqest but set a loading state
//       response = await axios.get(`${API_HOST}${route.path}`);

//     } catch(e) {
//       updateTracker((prev) => {
//         return {
//           ...prev,
//           state: 'error',
//           error: e
//         }
//       });
//       return;
//     }

//     const { data } = response;

//     updateTracker((prev) => {
//       return {
//         ...prev,
//         state: 'ready',
//         data
//       }
//     });

//   }

//   useEffect(() => {
//     fetchTracker() //make the request
//   }, [api])

//   // return the fetch tracker function and tracker state which includes our data
//   return {
//     fetchTracker,
//     ...tracker
//   }
// };

// export default useTracker;
