import {useNavigate, Navigate} from "react-router-dom";
import { useState } from "react";

//Components
import Resultados from './Resultados';
import Resultados2 from "./Resultados2";

function BusquedaAvanzada(props){

    /*Navigation*/
    let navigate = useNavigate();
    
    /*Handle options*/
    const [searchok, setsearchok] = useState(false);

    function handleOptions(e){

        const categorie = document.querySelector('.categorie').value;
        const streaming = document.querySelector('.streaming').value;
        const genre = document.querySelector('.genre').value;
        const search = document.querySelector('.search').value;
        
        if(search === ''){
            navigate(`/busquedaavanzada?categorie=${categorie}&streaming=${streaming}&genre=${genre}`);
            setsearchok(false);
            return
        }else{
            navigate(`/busquedaavanzada?keyword=${search}`);
            setsearchok(true);
        }
    }

    let token = sessionStorage.getItem('token');

    return(
        <>
            { !token && (<Navigate to="/"/>)}

            <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                
                <h2> Filtrar: </h2>
                                
                <div className=' w-100 d-flex flex-column flex-md-row justify-content-md-around'>

                    <div>
                        <h5>Categoria:</h5>
                        <select className="form-select categorie" aria-label="Default select example" onChange={handleOptions}>
                            <option value="popularity.desc" defaultValue>Seleccionar</option>
                            <option value="popularity.desc">Estrenos</option>
                            <option value="vote_count.desc">Mas Votadas</option>
                        </select>
                    </div>
                    <div>
                        <h5>Genero:</h5>
                        <select className="form-select genre" aria-label="Default select example" onChange={handleOptions}>
                            <option value="" defaultValue>Seleccionar</option>
                            <option value="28">Action</option>
                            <option value="16">Animation</option>
                            <option value="35">Comedia</option>
                            <option value="27">Terror</option>
                            <option value="878">Ciencia Ficción</option>
                            <option value="10749">Romance</option>
                        </select>
                    </div>
                    <div>
                        <h5>Servicio de Streaming:</h5>
                        <select className="form-select streaming" aria-label="Default select example" onChange={handleOptions}>
                            <option value="" defaultValue>Seleccionar</option>
                            <option value="8">Netflix</option>
                            <option value="337">Disney+</option>
                            <option value="118">HBO</option>
                            <option value="119">Amazon Prime Video</option>
                            <option value="339">Movistar Play</option>
                            <option value="167">Claro Video</option>


                        </select>
                    </div>
                    <div>
                        <h5>Búsqueda:</h5>
                        <input name="keyword" className="form-control search" type="search" placeholder="Search" aria-label="Search" onChange={handleOptions}/>
                    </div>

                </div>

            </div>
            
            {searchok && <Resultados favorites={props.favorites} addOrRemoveFavs={props.addOrRemoveFavs}/>}
            {!searchok && <Resultados2 favorites={props.favorites} addOrRemoveFavs={props.addOrRemoveFavs}/>}


        </>
    );
};

export default BusquedaAvanzada;