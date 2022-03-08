//Libraries
import swAlert from '@sweetalert/with-react'; 
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Navigate, Link} from 'react-router-dom'; 

//images
import notFoundImage from '../Assets/notfound.png';

//Css
import '../Css/listado.css';

function Listado(props){

    console.log(window.offsetHeight)
    // API KEY = 39a1ad177bbe458b862b777aba196d61
    //https://api.spoonacular.com/recipes/716429/information?apiKey=39a1ad177bbe458b862b777aba196d61&includeNutrition=true.
    // agregar luego de information "?apiKey=39a1ad177bbe458b862b777aba196d61&"
    

    //cargar lista de peliculas
    const [moviesList, setMoviesList] = useState([]);
    useEffect(()=>{
        //la solicitud de la api con el objeto json de todas las peliculas
        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=1eef2cd243e3e41df623a92b9e33798c&language=es-ES&page=1";

        axios
            .get(endPoint)
            .then( (res)=>{
                const apiData = res.data;
                setMoviesList(apiData.results);
            })
            //agarrar errores
            .catch( (error)=>{
                console.log(error);
                swAlert(
                    <h2>Hubo errores, intente mas tarde</h2>
                );
            });

    },[setMoviesList]);
    console.log(moviesList);

    //Icon Fav Verify
    const favMovies = JSON.parse(localStorage.getItem('favMovies'));
    console.log(!favMovies)

    /*Token Verify*/
    let token = sessionStorage.getItem('token');
    
    return(
        <>

            {   //Token Verify
                !token && (<Navigate to="/"/>)
            }

            <div className='mt-5'>

                <h2 className='margin-auto'>Home</h2>

                <div className='row'>

                    {
                        //cualquier iterador que no retorne nada no vamos a poder usar (map itera el array y devuelve un array nuevo)
                        moviesList.map((oneMovie,inx)=>{ //toma como parametros una pelicula y un indice (mapea todas las peliculas)

                            //retorno el contenedor de cada pelicula
                            return(

                                <div className=' col-6 col-sm-4 col-md-3 col-lg-3 p-3' style={{border:"0px solid black"}} key={inx}> {/* para que cada contenedor tenga un identificador unico uso el indice*/}
                                    
                                    { 
                                        !oneMovie.poster_path 
                                            && 
                                        (<div className="card w-100 h-100 d-flex">

                                            <div className="card border w-100 h-100 d-flex" key={oneMovie.inx}>
                                                <div className='d-flex img-container'>
                                                    <img src={notFoundImage} className="card-img-top img-fluid" alt="..." />
                                                </div>
                                                <button className='favourite-btn' onClick={props.addOrRemoveFavs} data-movie-id={oneMovie.id}>{(favMovies !== []) && ((favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("❤")))}{(favMovies === []) && (favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("🖤"))}</button>
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
                                                <button className='favourite-btn' onClick={props.addOrRemoveFavs} data-movie-id={oneMovie.id}>{(favMovies !== []) && (favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("❤"))}{(favMovies === []) && (favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("🖤"))}</button>
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

export default Listado;