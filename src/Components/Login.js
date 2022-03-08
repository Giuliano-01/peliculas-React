//Libraries
import swAlert from '@sweetalert/with-react'; 
import axios from 'axios';
import {useNavigate, Navigate} from "react-router-dom";

//css
import '../Css/Login.css'

function Login(){
    
    /*Navigation*/
    let navigate = useNavigate();

    /*Validations*/
    function submitDisplay() {

        var button = document.getElementById("btn-login");

        if (document.getElementById("email").validity.valid && document.getElementById("password").validity.valid) {
            button.classList.remove('btn-secondary');
            button.className = 'btn-primary';
            button.disabled = false;
          
        } else {
            button.classList.remove('btn-primary');
            button.className = 'btn-secondary';
            button.disabled = true;
        }

    }
    function onChangeEmail(){
        var input = document.getElementById('email');

        if(input.validity.valid){
            input.classList.remove('is-invalid');
            input.className = 'is-valid';
            input.style.borderBottom = " 2px solid green ";
            console.log("valid")
        }else{
            input.classList.remove('is-valid');
            input.className = 'is-invalid';
            input.style.borderBottom = " 2px solid red ";
            console.log("invalid")
        }
        submitDisplay();
    }
    function onChangePassword(){
        var input = document.getElementById('password');

        if(input.validity.valid){
            input.className = 'is-valid';
            input.style.borderBottom = " 2px solid green ";
            console.log("valid")
        }else{
            input.classList.remove('is-valid');
            input.className = 'is-invalid';
            input.style.borderBottom = " 2px solid red ";
            console.log("invalid")
        }
        submitDisplay();
    }
    /*Submit Handler (API)*/
    function submitHandler(e){
        e.preventDefault();

        /*Loading screen*/
        let html = `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...`;
        var button = e.target[2];
        button.innerHTML = html;
        button.classList.remove('btn-primary');
        button.className = 'btn-secondary';
        button.disabled = true;

        /*VALIDATIONS JS*/
        /*por si esta habilitado el button*/
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        if(email === '' || password === ''){
            console.log("los campos no pueden estar vacios");
            
            swAlert(
                <h2>Los campos no pueden estar vacíos</h2>
            ); 
            button.innerHTML = "Ingresa";
            return;
        }
        const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if(email !== '' && !regexEmail.test(email)){
            console.log("debe introducir una direccion de correo electronico valida");

            swAlert(
                <h2>Debe introducir una direccion de correo electronico valida</h2>
            );
            button.innerHTML = "Ingresa";
            button.classList.remove('btn-secondary');
            button.className = 'btn-primary';
            button.disabled = false;
            return;
        }
        if(email !== 'challenge@alkemy.org' || password !== 'react'){
            console.log("credenciales invalidas");

            swAlert({
                icon: 'error',
                title: 'Oops...',
                text: 'Credenciales invalidas!'
            })
            button.innerHTML = "Ingresa";
            button.classList.remove('btn-secondary');
            button.className = 'btn-primary';
            button.disabled = false;
            return;
        }

        console.log("estamos listos para enviar la informacion");
        
        //le envio los datos siguientes a la API del challenge
        axios
            .post('http://challenge-react.alkemy.org' , {email, password}) //la api si no recibe el email correcto da error 401
            .then( (res) => {
                swAlert(
                    <h2>Has ingresado correctamente</h2>
                );
                console.log(res);
                const tokenRecibido = res.data.token;//este es el token que me da la api para identificarme
                //el local storage es un objeto de tu navegador para guardar cosas de x pagina (tiene muchos metodos)
                // localStorage.setItem('token', tokenRecibido); //nombre y el otro es la info que quiero guardar localmente para siempre
                sessionStorage.setItem('token',tokenRecibido);//guarda la info mientras tenga el navegador abierto

                //una vez que esta el token en el localStorage del navegador ya lo puedo usar desde cualquier componente
                //para borrar todo es localStorage.clear
                //para borrar un item es localStorage.removeItem('otro');

                button.innerHTML = "Ingresa";
                button.classList.remove('btn-secondary');
                button.className = 'btn-primary';
                button.disabled = false;
                navigate('/home');
            });
            
    };

    /*Token Verify*/
    let token = sessionStorage.getItem('token');
    console.log(!token);
    
    return(
      
        
        <>

            {   //Token Verify
                token && (<Navigate to="/home"/>)
            }

            {/*FORM*/}
            <div className='d-flex flex-column align-items-center justify-content-center mt-5' style={{border:"0px solid black"}}>
                
                <h2 className="text-danger mb-4 mt-4">Inicia Sesión para continuar</h2>
                
                <form className="p-5 d-flex flex-column login-form" id='form' onSubmit={submitHandler}>
                    <label>
                        <span >Correo electronico:</span> <br/>
                        <input type="text" className=" " name="email" id="email" placeholder='Email' onChange={ onChangeEmail } pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" title="ingresa un email válido" required/>
                        <div className="valid-feedback">
                            Parece valido! ✓
                        </div>
                        <div className="invalid-feedback">
                          Email no válido
                        </div>
                    </label>
                    <br/>
                    <label>
                        <span>Contraseña:</span> <br/>
                        <input type="password" className=" " name="password" id="password" placeholder='Password' onChange={ onChangePassword } title="ingresa una contraseña válida" required/>
                        {/*
                            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                            Contraseñas que contengan al menos una letra mayúscula.
                            Contraseñas que contengan al menos una letra minúscula.
                            Contraseñas que contengan al menos un número o caracter especial.
                            Contraseñas cuya longitud sea como mínimo 8 caracteres.
                            Contraseñas cuya longitud máxima no debe ser arbitrariamente limitada.
                        */}
                        <div className="valid-feedback">
                          Parece valido! ✓
                        </div>
                        <div className="invalid-feedback">
                          Email no válido
                        </div>
                    </label>
                    <br/>
                    <button disabled="submit" className='btn-secondary m-2' id='btn-login'>Ingresa</button>
                </form>

            </div>

        </>
       
    );
}

export default Login;