import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { useStore } from "../appStore";

function Plans() {
	const user = useStore((state) => state.user);
	const userSubscriptionType = useStore((state) => state.userSubscriptionType);
	const setUserSubscriptionType = useStore((state) => state.setUserSubscriptionType);
	const [products, setProducts] = useState();
	const [subscription, setSubscription] = useState(null);

	useEffect(() => {
		getDocs(collection(db, "customers", user.uid, "subscriptions")).then((querySnapshot) => {
			querySnapshot.forEach(async (subscription) => {
				setSubscription({
					role: subscription.data().role,
					current_period_end: subscription.data().current_period_end.seconds,
					current_period_start: subscription.data().current_period_start.seconds,
				});
				setUserSubscriptionType(subscription.data().role);
			});
		});
	}, [user.uid]);

	console.log(subscription);

	useEffect(() => {
		const q = query(collection(db, "products"), where("active", "==", true));
		const querySnapshot = getDocs(q).then((snapshot) => {
			const products = {};
			snapshot.forEach(async (productDoc) => {
				products[productDoc.id] = productDoc.data();
				const priceSnap = await getDocs(collection(db, "products", productDoc.id, "prices"));
				priceSnap.docs.forEach((price) => {
					products[productDoc.id].prices = {
						priceId: price.id,
						priceData: price.data(),
					};
				});
				setTimeout(() => {
					setProducts(products);
				}, 150);
			});
		});
	}, [db]);

	const loadCheckout = async (priceId) => {
		const docRef = await addDoc(collection(db, "customers", user.uid, "checkout_sessions"), {
			price: priceId,
			success_url: window.location.origin,
			cancel_url: window.location.origin,
		});

		onSnapshot(docRef, (snap) => {
			const { error, url } = snap.data();

			if (error) {
				alert(`An error occured: ${error.message}`);
			}

			if (url) {
				window.location.assign(url);
			}
		});
	};

	return (
		<div>
			<h3 className="text-xl font-semibold mb-6 border-b border-gray-900">Plans {userSubscriptionType && <span className="text-gray-500 text-sm">{` | Current Plan: ${userSubscriptionType.charAt(0).toUpperCase() + userSubscriptionType.slice(1)}`}</span>}</h3>
			{subscription && <p className="text-gray-400">Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
			<div className="flex flex-col">
				{products &&
					Object.entries(products).map(([productId, productData]) => {
						// Add some logic to check if users subscription is active...
						const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
						return (
							<div className="flex justify-between p-4 group" key={productId}>
								<div className="text-gray-300">
									<h5 className="group-hover:text-white">
										{productData.name} - {productData.description}
									</h5>
									<h6 className="text-gray-500">
										${productData?.prices?.priceData?.unit_amount / 100}
										{productData.prices?.priceData?.currency.toUpperCase()} per {productData?.prices?.priceData?.recurring?.interval}
									</h6>
								</div>
								<button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)} className={`px-6 font-semibold bg-[#e50914] group-hover:bg-red-500 ${isCurrentPackage && "bg-green-700 group-hover:bg-green-800 cursor-not-allowed"}`}>
									{isCurrentPackage ? "Current Package" : "Subscribe"}
								</button>
							</div>
						);
					})}
			</div>
		</div>
	);
}
export default Plans;
