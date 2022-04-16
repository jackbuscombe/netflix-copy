import axios from "../axios/axios";
import { useState, useEffect } from "react";

function Row({ title, fetchUrl, isLargeRow = false }) {
	const base_url = "https://image.tmdb.org/t/p/original/";
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}

		fetchData();
	}, [fetchUrl]);

	console.log(movies);

	return (
		<div className="text-white">
			<h2>{title}</h2>
			<div className="flex overflow-y-hidden overflow-x-scroll scrollbar-hide p-12">{movies.map((movie) => ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && <img className={`text-white ml-12 h-28 w-18 mr-4 w-full transition-transform hover:scale-105 cursor-pointer ${isLargeRow && "max-h-52 object-contain hover:scale-110"}`} key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />)}</div>
		</div>
	);
}
export default Row;
