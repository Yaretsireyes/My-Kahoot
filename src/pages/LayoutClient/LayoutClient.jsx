import { useContext, useEffect} from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import './style.css'
import { KahootContext } from "../../context";


const LayoutClient = () => {

    const {
        /*Estados*/
        preguntas,
        notFount,
        setNotFount,
        testObjeto,
        setTestObjeto,
    } = useContext(KahootContext)


    const { codigo } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const prueba = preguntas.find((item) => item.codigo === codigo)
        if (!prueba) {
            setNotFount(true)
        } else {
            setTestObjeto(prueba)
        }
    }, [])

    const start = () => {
        navigate(`/game/${codigo}/start`)
    }


    return (
        <>
            {notFount &&
                <>
                    <div className="loade">
                        <span className="load"></span>
                        <span className="loader-text"><h1>Test no Encontrado</h1></span>
                    </div>
                </>
            }

            {
                !notFount && (
                    <div className="d-flex flex-column align-items-center justify-content-center container-kahoot">
                        <h1 className="text-kahoot ms-5">Welcome to Kahot Chango!</h1>
                        <div className="container-propiedades">
                            <div className="card mt-5" style={{ width: '25rem', height: '16rem' }}>
                                <p className="autor-kahoot">The Autor Game is:{testObjeto?.autor} </p>
                                <p className="time-kahoot">Time to take test: {`${testObjeto?.time} Minutos`} </p>
                                <p className="preguntas-kahoot">Total Questions in Test: {testObjeto?.preguntasArray?.length}</p>
                            </div>
                        </div>
                        <Button onClick={start} className="bg-black mt-5 ms-5">Start</Button>
                    </div>
                )
            }
        </>
    );
}

export default LayoutClient;