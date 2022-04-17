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

	return (
		<div className="text-white px-12 mt-6">
			<h2 className="text-xl font-semibold">{title}</h2>
			<div className="flex overflow-y-hidden overflow-x-scroll scrollbar-hide py-6">{movies.map((movie) => ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && <img className={`mx-3 h-44 w-full transition-transform hover:scale-110 cursor-pointer ${isLargeRow && "h-64 max-h-64 object-contain hover:scale-125"}`} key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />)}</div>
		</div>
	);
}
export default Row;
