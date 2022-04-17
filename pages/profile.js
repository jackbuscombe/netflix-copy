import { signOut } from "firebase/auth";
import { useStore } from "../appStore";
import Nav from "../components/Nav";
import { auth } from "../firebase";
import { useRouter } from "next/router";

function Profile() {
	const user = useStore((state) => state.user);
	const router = useRouter();

	return (
		<div className="bg-black text-white">
			<Nav />
			<div className="flex flex-col ml-auto mr-auto w-1/2 max-w-[800px] pt-32">
				<h1 className="text-3xl font-semibold mb-4 border-b border-gray-900">Edit Profile</h1>
				<div className="flex">
					<img className="h-36 w-3h-36" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
					<div className="ml-8 flex-1 font-semibold">
						<h2 className="bg-gray-600 p-4 mb-4">{user.email}</h2>
						<div>
							<h3 className="text-xl font-semibold mb-6 border-b border-gray-900">Plans</h3>
							<p className="text-gray-400">Renewal date: 04/06/2022</p>
							<div className="flex flex-col">
								<div className="flex justify-between p-4 group">
									<div className="text-gray-300">
										<h3 className="group-hover:text-white">Netflix Standard</h3>
										<p>1080p</p>
									</div>
									<button className="px-6 bg-[#e50914] font-semibold group-hover:bg-red-500">Subscribe</button>
								</div>
								<div className="flex justify-between p-4 group">
									<div className="text-gray-300">
										<h3 className="group-hover:text-white">Netflix Basic</h3>
										<p>480p</p>
									</div>
									<button className="px-6 bg-[#e50914] font-semibold group-hover:bg-red-500">Subscribe</button>
								</div>
								<div className="flex justify-between p-4 group">
									<div className="text-gray-300">
										<h3 className="group-hover:text-white">Netflix Premium</h3>
										<p>4K+HDR</p>
									</div>
									<button className="px-6 bg-[#e50914] font-semibold group-hover:bg-red-500">Subscribe</button>
								</div>
							</div>
							<button onClick={() => signOut(auth).then(() => router.push("/"))} className="bg-[#e50914] p-2 font-semibold w-full mt-4 hover:bg-red-500">
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Profile;
