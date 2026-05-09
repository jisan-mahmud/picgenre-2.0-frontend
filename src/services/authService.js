import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { axiosPublic } from '../api_call/axiosInstance';

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const firebaseToken = await result.user.getIdToken();
  console.log(firebaseToken)
  const { data } = await axiosPublic.post('/v1/accounts/auth/firebase-google/', {
    idToken: firebaseToken
  });

  // Return tokens instead of storing them directly
  return {
    access: data.refresh, // Note: API returns refresh as access, access as refresh - adjust based on your API
    refresh: data.access
  };
};
