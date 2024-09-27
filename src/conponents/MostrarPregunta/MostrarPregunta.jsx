import { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Temporizador from "../Temporizador/Temporizador";
import './style.css'
import { KahootContext } from "../../context";

const MostrarPregunta = () => {

    const { codigo } = useParams()

    const {
        /*Estados*/
        preguntas,
        test,
        setTest,
        siguiente,
        correctas,
        incorrectas,
        finish,
        setFinish,
        /*funciones*/
        handleButton
    } = useContext(KahootContext)


    useEffect(() => {
        const prueba = preguntas?.find((item) => item.codigo == codigo)
        setTest(prueba)
    }, [])


    return (
        <>
            {
                finish && (
                    <>
                        <div className="container-icons">
                            <div className="text-center fs-1">
                                <h1><i className="bi bi-check2-square"></i> {correctas}</h1>
                            </div>
                            <div className="text-center mt-5">
                                <h1><i className="bi bi-x-square"> </i>{incorrectas}</h1>
                            </div>
                        </div>
                    </>
                )}
            {
                !finish && (
                    <Container>
                        <Temporizador time={test?.time} setFinish={setFinish} />
                        <h1 className="text-center mt-5 text-decoration-underline">{test?.preguntasArray[siguiente]?.pregunta}</h1>
                        <Container>
                            <Row className=" text-center gap-4 mt-5">
                                <Col md={12} className="d-flex justify-content-center gap-4 ">
                                    <Button variant="danger" size="lg" style={{ width: '28rem' }} onClick={() => handleButton(test?.preguntasArray[siguiente]?.respuesta1)}>
                                        <i className="bi bi-caret-up fs-3 icon-kahoot"></i>
                                        {test?.preguntasArray[siguiente]?.respuesta1}
                                    </Button>

                                    <Button variant="primary" size="lg" style={{ width: '28rem' }} onClick={() => handleButton(test?.preguntasArray[siguiente]?.respuesta2)}>
                                        <i className="bi bi-diamond fs-3 icon-kahoot"></i>
                                        {test?.preguntasArray[siguiente]?.respuesta2}
                                    </Button>

                                </Col>
                                <Col md={12} className="d-flex justify-content-center gap-4">
                                    <Button variant="warning" size="lg" style={{ width: '28rem' }} onClick={() => handleButton(test?.preguntasArray[siguiente]?.respuesta3)}>
                                        <i className="bi bi-circle fs-3 icon-kahoot"></i>
                                        {test?.preguntasArray[siguiente]?.respuesta3}

                                    </Button>
                                    <Button variant="success" size="lg" style={{ width: '28rem' }} onClick={() => handleButton(test?.preguntasArray[siguiente]?.respuesta4)}>
                                        <i className="bi bi-square fs-3 icon-kahoot"></i>
                                        {test?.preguntasArray[siguiente]?.respuesta4}
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                )
            }
        </>
    );
}

export default MostrarPregunta;