import React, { useEffect, useState } from "react";

const Loader = () => {
	return (<div className="d-flex justify-content-center">
		<div className="spinner-border" role="status">
		  <span className="visually-hidden">Loading...</span>
		</div>
	  </div>
	)
}

const Card = (props) => {

	return (<div className="col-12 col-md-4 col-lg-4 col-xl-3 p-1">
			<div className="card">
			<img src={props.character.image} className="card-img-top" alt="..."/>
			<div className="card-body">
			<h5 className="card-title">{props.character.name}</h5>
			<p className="card-text">{props.character.gender}</p>
			<a href="#" className="btn btn-primary">Details</a>
			</div>
		</div>
	  </div>
	)
}

//create your first component
const Home = () => {
	// parte logica del componente

	const [ characters, setCharacters ] = useState([])
	const [ isLoading, setIsLoading ] = useState(true);
	const [ error, setError ] = useState(false)

	const urlAPI = 'https://rickandmortyapi.com/api/people';
	const correctUrlAPI = 'https://rickandmortyapi.com/api/character';

	const onLoadHome = (url) => {
		setIsLoading(true)
		fetch(url)
			.then((respuesta) => {
				if(respuesta.status == 404){
					throw new Error("No se encontraron personajes!")
				}else{
					setError(false);
				}
				return respuesta.json()
			})
			.then((data) => {
				setCharacters(data.results)
			})
			.catch(err => {
				console.log(err)
				setError(true)
			})
			.finally(()=>{
				setIsLoading(false);
			})
	}

	useEffect(() => {
		onLoadHome(urlAPI)
	},[])

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Rick & Morty Wiki!</h1>
			{
				isLoading && <Loader />
			}
			{
				error && <>
					<h1 className="text-danger display-3"> 404 not found!</h1>
					<button className="btn btn-danger"
						onClick={()=>{
							onLoadHome(correctUrlAPI);
						}}
					>Retry</button>
				</>
			}
			<div className="d-flex flex-wrap">
				{
					characters && characters.map( individuo => <Card character={individuo} />)
				}
			</div>
		</div>
	);
};

export default Home;