//libraries
import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

//Components
import Header from './Components/Header';
import Login from "./Components/Login";
import Listado from "./Components/Listado";
import Resultados from './Components/Resultados';
import Favoritos from './Components/Favoritos';
import Detalle from './Components/Detalle';
import BusquedaAvanzada from './Components/BusquedaAvanzada';

//Css
import './Css/App.css'

function App() {

  const [favorites, setFavorites] = useState([]);

  //agrego los favs del localStore en favourites para verlo en el componente
  useEffect( ()=>{

      const favsInLocal = localStorage.getItem('favMovies');
      if(favsInLocal !== null){
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray); //lo agrego en el boton tambien
      }

  },[]);

  //agrego o elimino los favs
  const addOrRemoveFavs = (e)=>{

    const favourite_btn = e.currentTarget;
    const favourite_btn_parent = favourite_btn.parentElement;
    
    
    /*compile data*/
    const imgURL = favourite_btn_parent.querySelector("img").getAttribute("src");
    const title = favourite_btn_parent.querySelector("h4").innerText;
    const overview = favourite_btn_parent.querySelector("p").innerText;
    const id = favourite_btn.dataset['movieId'];

    const movieData = { //objeto
      imgURL: imgURL,
      title: title,
      overview: overview,
      id: id
    }


    const favMovies = localStorage.getItem('favMovies');

    let tempMoviesinFavs = null;
    
    if(favMovies === null){
      tempMoviesinFavs = [];
    }else{
      tempMoviesinFavs = JSON.parse(favMovies); //transformo en array el JSON de localStorage
    }

    //si la pelicula NO está en el array (encuentro por id) 
    // la agrego al array temporal y agrego la info actualizada al localStorage!
    const movieIsinArray = tempMoviesinFavs.find(oneMovie => oneMovie.id === movieData.id);
    if(!movieIsinArray){
      tempMoviesinFavs.push(movieData);
      localStorage.setItem('favMovies', JSON.stringify(tempMoviesinFavs));

      setFavorites(tempMoviesinFavs);

      console.log("se agrego la pelicula");
    }else{
      //si la pelicula ESTÁ en el array (filtro por id)
      // agrego todas las de favs menos esa al array temporal y agrego la info actualizada al localStorage!
      let moviesLeft = tempMoviesinFavs.filter(oneMovie => { //agrego todas las peliculas menos esa (filter motrara todas las que tengan un id distinto)
        return oneMovie.id !== movieData.id;
      })
      localStorage.setItem('favMovies', JSON.stringify(moviesLeft));

      setFavorites(moviesLeft);

      console.log("se elimino la pelicula");
    }
  
  } 

  return (

    <>

      <Header/>
      <div className='p-4'>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/home" element={<Listado favorites={favorites} addOrRemoveFavs={addOrRemoveFavs}/>}/>
          <Route path="/resultados" element={<Resultados favorites={favorites} addOrRemoveFavs={addOrRemoveFavs}/>}/>
          <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFavs={addOrRemoveFavs}/>}/>
          <Route path="/busquedaavanzada" element={<BusquedaAvanzada favorites={favorites} addOrRemoveFavs={addOrRemoveFavs}/>}/>
          <Route path="/detalle" element={<Detalle/>}/>
        </Routes>
      </div>

    </>

  );
}

export default App;
