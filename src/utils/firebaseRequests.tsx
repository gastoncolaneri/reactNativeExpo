import firebaseApp from './firebase';
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

export function reauthenticate(password: any) {
  const user: any = getAuth(firebaseApp).currentUser;
  const credentials = EmailAuthProvider.credential(user.email, password);
  console.log(user.email);
  return reauthenticateWithCredential(user, credentials);
}
