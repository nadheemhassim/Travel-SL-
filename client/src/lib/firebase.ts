import { getAuth, updateProfile } from '@firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyCV3a90p_hbOUl9iA2wZ8HtBDHegtbXjZ0',
	authDomain: 'nadheem-travel-sl.firebaseapp.com',
	projectId: 'nadheem-travel-sl',
	storageBucket: 'nadheem-travel-sl.appspot.com',
	messagingSenderId: '453684257700',
	appId: '1:453684257700:web:1cbb479fe736fb60add731'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Create new user
export const createUser = async (email: string, password: string, name: string) => {
	const { createUserWithEmailAndPassword } = await import('firebase/auth');

	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	const user = userCredential.user;

	await updateProfile(user, {
		displayName: name
	});

	return user;
};

// Sign in user
export const signIn = async (email: string, password: string) => {
	const { signInWithEmailAndPassword } = await import('firebase/auth');

	const userCredential = await signInWithEmailAndPassword(auth, email, password);
	return userCredential.user;
};

// Sign out user
export const signOut = async () => {
	const { signOut } = await import('firebase/auth');
	await signOut(auth);
};

// Update user profile
export const updateUserProfile = async (name: string) => {
	const user = auth.currentUser;
	if (user)
		await updateProfile(user, {
			displayName: name
		});
};
