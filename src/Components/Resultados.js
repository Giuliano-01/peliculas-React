//Libraries
import {useState, useEffect} from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useSearchParams, Navigate, Link} from 'react-router-dom'; 

//images
import notFoundImage from '../Assets/notfound.png';

function Resultados(props){

    
    //refresh Keyword
    const [searchParams] = useSearchParams();
    const [movieResult, setMovieResult] = useState([]);
    //Get Keyword Search
    const currentParams = Object.fromEntries([...searchParams]);
    let keyword = currentParams.keyword;
    console.log(keyword); // get new values onchange
    useEffect(()=>{

        //la solicitud de la api con el objeto json de la busqueda
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=1eef2cd243e3e41df623a92b9e33798c&language=es-ES&query=${keyword}`;
        
        axios
            .get(endPoint)
            .then( (res)=>{
                const moviesArray = res.data.results;

                if(moviesArray.length === 0){
                    swAlert(
                        <h4>Tu busqueda no arrojo resultados</h4>
                    );
                }

                setMovieResult(moviesArray);
            })

    },[keyword, searchParams]); //el keyword cuando cambia refresca la pagina


    //Icon Fav Verify
    const favMovies = JSON.parse(localStorage.getItem('favMovies'));
    

    /*Token Verify*/
    let token = sessionStorage.getItem('token');

    return(
        <>

            {   //Token Verify
                !token && (<Navigate to="/"/>)
            }

            <div className='mt-5'>

                <h2>Resultados de la busqueda: "{keyword}"</h2>

                {movieResult.length === 0 && (<h3>No hay resultados</h3>)}

                <div className='row my-3'>

                    {
                        //cualquier iterador que no retorne nada no vamos a poder usar (map itera el array y devuelve un array nuevo)
                        movieResult.map((oneMovie,inx)=>{ //toma como parametros una pelicula y un indice (mapea todas las peliculas)

                            //retorno el contenedor de cada pelicula
                            return(

                                <div className=' col-6 col-sm-4 col-md-3 col-lg-3 p-3 mt-5' style={{border:"0px solid black"}} key={inx}> {/* para que cada contenedor tenga un identificador unico uso el indice*/}
                                    
                                    { 
                                        !oneMovie.poster_path 
                                            && 
                                        (<div className="card w-100 h-100 d-flex">

                                            <div className="card border w-100 h-100 d-flex" key={oneMovie.inx}>
                                                <div className='d-flex img-container'>
                                                    <img src={notFoundImage} className="card-img-top img-fluid" alt="..." />
                                                </div>
                                                <button className='favourite-btn' onClick={props.addOrRemoveFavs} data-movie-id={oneMovie.id}>{favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("❤")}{!favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("🖤")}</button>
                                                <div className="card-body d-flex flex-column justify-content-between">
                                                  <h4 className="card-title text-center">{oneMovie.title.substring(0,30)}...</h4>
                                                  <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
                                                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-info d-flex justify-content-center">Detalle</Link>
                                                </div>
                                            </div>

                                        </div>)
                                    }
                                    { 
                                        oneMovie.poster_path 
                                            && 
                                        (<div className="card w-100 h-100 d-flex">

                                            <div className="card border w-100 h-100 d-flex" key={oneMovie.inx}>
                                                <div className='d-flex img-container'>
                                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top img-fluid" alt="..." />
                                                </div>
                                                <button className='favourite-btn' onClick={props.addOrRemoveFavs} data-movie-id={oneMovie.id}>{favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("❤")}{!favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("🖤")}</button>
                                                <div className="card-body d-flex flex-column justify-content-between">
                                                  <h4 className="card-title text-center">{oneMovie.title.substring(0,30)}...</h4>
                                                  <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
                                                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-info d-flex justify-content-center">Detalle</Link>
                                                </div>
                                            </div>

                                        </div>)
                                    }

                                </div>

                            );

                        })
                    }

                </div>

            </div>

        </>

    );
};

export default Resultados;