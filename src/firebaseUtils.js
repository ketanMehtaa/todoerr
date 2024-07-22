// // firebaseUtils.js
// import { db } from './firebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// export const addTodo = async (todo) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (user) {
//     try {
//       const userTodosRef = collection(db, 'users', user.uid, 'todos');
//       const docRef = await addDoc(userTodosRef, todo);
//       console.log('Todo added with ID:', docRef.id);
//     } catch (e) {
//       console.error('Error adding todo:', e);
//     }
//   } else {
//     console.error('No user is signed in');
//   }
// };
