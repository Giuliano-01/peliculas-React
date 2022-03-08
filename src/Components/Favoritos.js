//Libraries
import {Navigate, Link} from 'react-router-dom';


function Favoritos(props){

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

                <h2>Seccion de Favoritos</h2>

                <div className='row my-3'>

                    {!props.favorites.length > 0 && <div className='text-danger col-12'> No tienes nada en favoritos </div> }

                    {
                        //cualquier iterador que no retorne nada no vamos a poder usar (map itera el array y devuelve un array nuevo)
                        props.favorites.map((oneMovie,inx)=>{ //toma como parametros una pelicula y un indice (mapea todas las peliculas)
                            
                            //retorno el contenedor de cada pelicula
                            return(

                                <div className=' col-6 col-sm-4 col-md-3 col-lg-3 p-3' style={{border:"0px solid black"}} key={inx}> {/* para que cada contenedor tenga un identificador unico uso el indice*/}
                                    
                                    <div className="card w-100 h-100 d-flex">

                                        <div className="card border w-100 h-100 d-flex" key={oneMovie.inx}>
                                            <div className='d-flex img-container'>
                                                <img src={oneMovie.imgURL} className="card-img-top img-fluid" alt="..." />
                                            </div>
                                            <button className='favourite-btn' onClick={props.addOrRemoveFavs} data-movie-id={oneMovie.id}>{favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("❤")}{!favMovies.find(favMovies => favMovies.id === `${oneMovie.id}`) && ("🖤")}</button>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                              <h4 className="card-title text-center">{oneMovie.title.substring(0,30)}...</h4>
                                              <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
                                              <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-info d-flex justify-content-center">Detalle</Link>
                                            </div>
                                        </div>

                                    </div>
    
                                </div>

                            );

                        })
                    }

                </div>

            </div>

        </>
    );
};

export default Favoritos;