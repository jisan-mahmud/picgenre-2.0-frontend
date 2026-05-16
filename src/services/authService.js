import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { axiosPublic } from '../api_call/axiosInstance';

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const firebaseToken = await result.user.getIdToken();
  console.log(firebaseToken)
  const payload = {
    idToken: firebaseToken
  };

  const { data } = await axiosPublic.post('/v1/accounts/auth/firebase-google/', payload);

  // Return tokens using the API response shape.
  return {
    access: data.access,
    refresh: data.refresh,
  };
};
