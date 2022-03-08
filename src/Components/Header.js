//Libraries
import {Link} from 'react-router-dom';
import swAlert from '@sweetalert/with-react'; 
import {useNavigate} from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//Components


function Header(props){

    
    /*Navigation*/
    let navigate = useNavigate();

    //Search Handler
    const searchHandler = (values, { setSubmitting })=>{
        const keyword = values.search;
        // quita los espacios al principio y al final del string .trim

        if (keyword.length === 0){
            swAlert(
                <h2>Tienes que escribir una palabra clave</h2>
            );
            setSubmitting(false);
        }
        if (keyword.length <= 2){
            swAlert(
                <h2>Tienes que escribir mas de 2 caracteres</h2>
            );
            setSubmitting(false);
        }else{
            values.search = '';
            document.querySelector(".navbar-toggler").click();
            navigate(`/resultados?keyword=${keyword}`);
            setSubmitting(false);
        } 
    };
    //Search Handler Formika
    const SignupSchema = Yup.object().shape({
        search: Yup.string()
            .min(2, 'Muy corto!')
            .max(50, 'Muy largo!'),
    });

  return(

    <header className="header w-100 position-fixed" style={{zIndex:"1"}}>

        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-2">
          
            <div className="container-fluid">

                <div className="navbar-brand">Navbar</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favoritos" className="nav-link">Favoritos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/busquedaavanzada" className="nav-link">Busqueda Avanzada</Link>
                        </li>
                    </ul>

                    {/*Search form "Formika"*/}
                    <Formik
                        initialValues={{
                            search: '',
                        }}

                        validationSchema={SignupSchema}

                        onSubmit={searchHandler}
                    >

                        {({ errors, touched, isSubmitting }) => (

                            <Form className="d-flex flex-column position-relative">
                                <div className='d-flex'>
                                    <Field name="search" className="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search"/>      
                                    <button className="btn btn-outline-success" type="submit" disabled={isSubmitting}>Buscar</button>
                                </div>
                                {errors.search && touched.search ? (<div className='position-absolute top-100 badge rounded-pill bg-secondary '>{errors.search}</div>) : null}
                            </Form>
                        )}

                    </Formik>

                </div>

            </div>

        </nav>

    </header>

    );
};

export default Header;