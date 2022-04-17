import { useState } from "react";
import SignUpScreen from "../components/SignUpScreen";

function Login() {
	const [signIn, setSignIn] = useState(false);

	return (
		<div
			className="relative h-screen"
			style={{
				backgroundImage: 'url("https://assets.nflxext.com/ffe/siteui/vlv3/8459cea4-79ab-4f27-9ef0-a7c92a30a9bb/97ba6dd6-c5ea-4c44-9916-32789b5c0bef/AU-en-20220411-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			<div className="absolute w-full h-screen bg-gradient-to-t from-black via-black/60 to-black opacity-80" />
			<div className="fixed w-full z-50">
				<div className="fixed flex justify-between w-full px-8 items-center">
					<img className="w-40 object-contain" src="https://index.impakter.com/wp-content/uploads/2020/11/Netflix-Logo.png" alt="" />
					<button onClick={() => setSignIn(true)} className="bg-[#e50914] py-2 px-6 text-white font-semibold border-none cursor-pointer">
						Sign In
					</button>
				</div>
			</div>

			<div className="text-white absolute top-1/3 w-full text-center">
				{signIn ? (
					<SignUpScreen />
				) : (
					<>
						<h1 className="text-5xl font-bold mb-12 w-1/2 mx-auto">Unlimited films, TV programmes and more.</h1>
						<h2 className="text-3xl mb-6 font-semibold">Watch anywhere. Cancel at any time</h2>
						<h3 className="mb-6 text-xl font-semibold">Ready to watch? Enter your email to create or restart your membership.</h3>

						<div>
							<form className="">
								<input className="p-5 outline-none text-black w-1/3 max-w-[600px]" type="email" placeholder="Email address" />
								<button onClick={() => setSignIn(true)} className="bg-[#e50914] p-5 text-center font-semibold">
									{"GET STARTED >"}
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
export default Login;
