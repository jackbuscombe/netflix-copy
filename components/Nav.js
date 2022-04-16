import { useState, useEffect } from "react";

function Nav() {
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
		<div className={`fixed top-0 p-6 w-full h-36 z-50 transition-all ease-in items-center ${show && "bg-black"}`}>
			<div className="flex justify-between items-center">
				<img className="fixed h-24 w-36 left-0 object-contain pl-8 cursor-pointer top-4" src="https://index.impakter.com/wp-content/uploads/2020/11/Netflix-Logo.png" alt="Netflix" />
				<img className="fixed right-4 h-12 w-12 cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
			</div>
		</div>
	);
}
export default Nav;
