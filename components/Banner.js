import { useState, useEffect } from "react";
import axios from "../axios/axios";
import requests from "../axios/Requests";

function Banner() {
	const [movie, setMovie] = useState();

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginials);
			setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
			return request;
		}

		fetchData();
	}, []);

	function truncate(string, n) {
		return string?.length > n ? string.substr(0, n - 1) + "..." : string;
	}

	console.log(movie);
	return (
		<header
			className="bg-cover relative h-2/5 object-contain"
			style={{
				backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
				backgroundPosition: "center center",
			}}
		>
			<div className="ml-10 pt-40 h-80 text-white">
				<h1 className="text-6xl font-bold pb-8">{movie?.title || movie?.name || movie?.original_name}</h1>
				<div className="">
					<button className="cursor-pointer outline-none border-none rounded-md px-12 mr-6 py-2 bg-gray-800 bg-opacity-80 font-semibold hover:text-black hover:bg-gray-100 transition-all ease-out">Play</button>
					<button className="cursor-pointer outline-none border-none rounded-md px-12 mr-4 py-2 bg-gray-800 bg-opacity-80 font-semibold hover:text-black hover:bg-gray-100 transition-all ease-out">My List</button>
				</div>
				<h1 className="w-1/3 pt-6 max-w-3xl h-22">{truncate(movie?.overview, 150)}</h1>
			</div>
			<div className="h-40 bg-gradient-to-b from-transparent to-black" />
		</header>
	);
}
export default Banner;
