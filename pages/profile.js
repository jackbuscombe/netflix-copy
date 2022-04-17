import { signOut } from "firebase/auth";
import { useStore } from "../appStore";
import Nav from "../components/Nav";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Plans from "../components/Plans";

function Profile() {
	const user = useStore((state) => state.user);
	const router = useRouter();

	return (
		<div className="bg-black text-white">
			<Nav />
			<div className="flex flex-col ml-auto mr-auto w-1/2 max-w-[800px] pt-32">
				<h1 className="text-5xl font-semibold mb-4 border-b border-gray-900">Edit Profile</h1>
				<div className="flex">
					<img className="h-36 w-3h-36" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
					<div className="ml-8 flex-1 font-semibold">
						<h2 className="bg-gray-600 p-4 mb-4">{user.email}</h2>
						<div>
							<Plans />
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
