import { auth } from './firebase';
import { 
  PhoneAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  User as FirebaseUser,
  signInWithPhoneNumber,
  ApplicationVerifier
} from 'firebase/auth';
import { User, OTPResponse, VerifyOTPResponse } from "@/types/auth";

// Create a mock ApplicationVerifier
const mockApplicationVerifier: ApplicationVerifier = {
  type: 'recaptcha',
  verify: () => Promise.resolve('mock-recaptcha-token'),
  _reset: () => {}, 
  clear: () => {}, 
};

export async function sendOTP(phoneNumber: string): Promise<OTPResponse> {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, mockApplicationVerifier);
    
    return {
      success: true,
      verificationId: confirmationResult.verificationId,
      message: 'OTP sent successfully',
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: 'Failed to send OTP: ' + (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function verifyOTP(verificationId: string, otp: string): Promise<VerifyOTPResponse> {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const userCredential = await signInWithCredential(auth, credential);
    const firebaseUser = userCredential.user;

    const user: User = {
      id: firebaseUser.uid,
      phoneNumber: firebaseUser.phoneNumber,
      displayName: firebaseUser.displayName,
      type: 'customer', // Default to customer, you can implement role management later
    };

    return {
      success: true,
      message: 'OTP verified successfully',
      user,
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      message: 'Invalid OTP: ' + (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function signOut(): Promise<{ success: boolean; message: string }> {
  try {
    await firebaseSignOut(auth);
    return { success: true, message: 'Signed out successfully' };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, message: 'Failed to sign out' };
  }
}

/*export async function getCurrentUser(): Promise<User | null> {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;

  return {
    id: firebaseUser.uid,
    phoneNumber: firebaseUser.phoneNumber,
    displayName: firebaseUser.displayName,
    type: 'customer', // Default to customer, implement role management later
  };
}*/

export function mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
  return {
    id: firebaseUser.uid,
    phoneNumber: firebaseUser.phoneNumber,
    displayName: firebaseUser.displayName,
    type: 'customer', // Default to customer, implement role management later
  };
}

export async function getCurrentUser() {
  try {
    // Simulating an API call or database query
    // In a real application, you would fetch the user data from your backend
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      type: 'seller'
    };

    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}