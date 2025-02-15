import { useMutation } from '@tanstack/react-query';
import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../data/firebase';
import { useAuthStore } from '../store/authStore';
import { LoginFormValues, RegisterFormValues } from '../types/authTypes';
  
  export const useAuth = () => {
    const { setUser, setLoading } = useAuthStore();
  
    // Monitor auth state changes
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, [setUser, setLoading]);
  
    // Login mutation
    const loginMutation = useMutation({
      mutationFn: async (values: LoginFormValues) => {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      }
    });
  
    // Register mutation
    const registerMutation = useMutation({
      mutationFn: async (values: RegisterFormValues) => {
        const { email, password, fullName } = values;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with full name
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
        
        return userCredential.user;
      }
    });
  
    // Sign out mutation
    const signOutMutation = useMutation({
      mutationFn: async () => {
        await firebaseSignOut(auth);
      }
    });
  
    return {
      loginMutation,
      registerMutation,
      signOutMutation
    };
  };