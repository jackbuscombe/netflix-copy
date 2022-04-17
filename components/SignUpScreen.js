import { useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";

function SignUpScreen() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const register = (e) => {
		e.preventDefault();

		createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
			.then((userCredential) => {
				console.log(userCredential.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const signIn = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
			.then((userCredential) => {
				console.log(userCredential.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="absolute left-0 right-0 mx-auto max-w-[600px] p-8 bg-black/80 text-black">
			<form className="grid flex-col">
				<h1 className="text-3xl font-bold mb-5 text-left text-white">Sign In</h1>
				<input ref={emailRef} className="p-4 outline-none border-none rounded-md mb-2" type="email" placeholder="Email" />
				<input ref={passwordRef} className="p-4 outline-none border-none rounded-md mb-5" type="password" placeholder="Password" />
				<button onClick={signIn} className="bg-[#e50914] p-4 font-semibold rounded-md mb-5 text-white" type="submit">
					Sign In
				</button>
				<h4 className="text-gray-400 text-left font-semibold">
					New to Netflix?{" "}
					<span onClick={register} className="text-white cursor-pointer hover:underline hover:font-bold">
						Sign up now!
					</span>
				</h4>
			</form>
		</div>
	);
}
export default SignUpScreen;
