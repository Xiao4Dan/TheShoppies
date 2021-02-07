import React from 'react';

const MovieList = (props) => {
	return (
		<>
			{props.movies.Search.map((movie, index) => (
				<div className="card">
					<img id="poster" src={movie.Poster} alt={movie.Title}></img>
                    <form id={movie.imdbID} class="ratingStars">
						<input type="radio" id={movie.imdbID + "star5"} name={movie.imdbID} value="5" onClick={props.rateMovie.bind(this)}/>
						<label for={movie.imdbID + "star5"} title={movie.imdbID}></label>
						<input type="radio" id={movie.imdbID + "star4"} name={movie.imdbID} value="4" onClick={props.rateMovie.bind(this)}/>
						<label for={movie.imdbID + "star4"}  title={movie.imdbID}></label>
						<input type="radio" id={movie.imdbID + "star3"} name={movie.imdbID} value="3" onClick={props.rateMovie.bind(this)}/>
						<label for={movie.imdbID + "star3"}  title={movie.imdbID}></label>
						<input type="radio" id={movie.imdbID + "star2"} name={movie.imdbID} value="2" onClick={props.rateMovie.bind(this)}/>
						<label for={movie.imdbID + "star2"}  title={movie.imdbID}></label>
						<input type="radio" id={movie.imdbID + "star1"} name={movie.imdbID} value="1" onClick={props.rateMovie.bind(this)}/>
						<label for={movie.imdbID + "star1"} title={movie.imdbID}></label>
                    </form>
                    <p id="title">{movie.Title}</p>
				</div>
			))}
		</>
	);
};

export default MovieList;

/**                        <span >0</span>
                        <span onClick={props.rateMovie.bind(this)}>1</span>
                        <span onClick={props.rateMovie.bind(this)}>2</span>
                        <span onClick={props.rateMovie.bind(this)}>3</span>
                        <span onClick={props.rateMovie.bind(this)}>4</span> */