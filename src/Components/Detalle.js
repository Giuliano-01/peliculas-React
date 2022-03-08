import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

function Detalle(){

    let token = sessionStorage.getItem('token');


    //en window.location obtengo la direccion en donde me encuentro https:// etc
    //luego con let query = new URLSearchParams(); busco los parametros que tengo en el url (lo que esta luego de ?)
    let query = new URLSearchParams(window.location.search);
    console.log(query.get('movieID')); //tomo el elemento que tiene el identificador movieID
    let movieID = query.get('movieID');

    //como el llamado a la api es asincronico uso estados. 
    const [movieDetail, setMovieDetail] = useState([]);

    //obtengo de la api los detalles de la pelicula segun el id
    useEffect(()=>{
        //la solicitud de la api con el objeto json del detale
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=1eef2cd243e3e41df623a92b9e33798c&language=es-ES`;

        axios
            .get(endPoint)
            .then( (res)=>{
                const movieData = res.data;
                setMovieDetail(movieData);
            })
            //agarrar errores
            .catch( (error)=>{
                console.log(error);
                swAlert(
                    <h2>Hubo errores, intente mas tarde</h2>
                );
            });

    },[movieID]);
    console.log(movieDetail);

    return(

        <>
            { !token && (<Navigate to="/"/>)}
            
            {(movieDetail.length === 0) && <> <h2 className='mt-5'>Cargando...{console.log("no cargo")}</h2> </>}
            {/*para que no pida los detalles de movie antes de que se halla cargado en use state hago:*/}
            {(movieDetail.length !== 0) && 
            <>
                <h2 className='mt-5'>Titulo: {movieDetail.title} </h2>
                <div className='row'>
                    <div className='col-4'>
                        <img src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt="movie poster" className='img-fluid'></img>
                    </div>
                    <div className='col-8'>
                        <h5>Fecha de estreno:{movieDetail.release_date}</h5>
                        <h5>Reseña:</h5>
                        <p>{movieDetail.overview}</p>
                        <h5>Rating: {movieDetail.vote_average}</h5>
                        <h5>Generos</h5>
                        <ul>
                            {movieDetail.genres.map((oneGenre,inx)=>{return(<li key={inx}> {oneGenre.name} </li>)})}
                        </ul>
                    </div>
                </div>
            </>} {/* aprovecho de la lógica trivalente (o cortocircuito) */}
        </>

    );
};

export default Detalle;