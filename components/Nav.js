import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Nav() {
	const router = useRouter();
	const [show, setShow] = useState(false);

	const transitionNavBar = () => {
		if (window.scrollY > 100) {
			setShow(true);
		} else {
			setShow(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", transitionNavBar);
		return () => window.removeEventListener("scroll", transitionNavBar);
	}, []);

	return (
		<div className={`fixed top-0 p-6 w-full h-1/6 z-50 transition-all ease-in object-center ${show && "bg-black"}`}>
			<div className="flex justify-between items-center h-full px-4">
				<img onClick={() => router.push("/")} className="h-24 w-32 cursor-pointer object-contain" src="https://index.impakter.com/wp-content/uploads/2020/11/Netflix-Logo.png" alt="Netflix" />
				<img onClick={() => router.push("/profile")} className="h-12 w-12 cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
			</div>
		</div>
	);
}
export default Nav;
