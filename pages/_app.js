import "../styles/globals.css";
import { useRouter } from "next/router";
import Login from "./login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useStore } from "../appStore";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({
					email: user.email,
					uid: user.uid,
				});
			} else {
				setUser(null);
				router.push("/");
			}
		});

		return unsubscribe;
	}, [setUser]);

	if (!user) {
		return <Login />;
	} else {
		return <Component {...pageProps} />;
	}
}

export default MyApp;
