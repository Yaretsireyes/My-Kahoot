import { useContext } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import InputRespuestas from "../../conponents/inputRepuestas/InputRespuestas";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { KahootContext } from "../../context";


const CreateTest = () => {

    const navigate = useNavigate()


    const {
        show,
        active,
        preguntasArray,
        setPreguntasArray,
        handleClose,
        handleShow,
        actualizarRespuestaCorrecta,
        onChangeText,
        onSubmit,
        eliminar,
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useContext(KahootContext)




    const handleCreateTest = (data) => {
        const { autor, time, nombreTest } = data
        if (preguntasArray.length <= 0) {
            alert('No hay nada')
        } else {
            const guardar = {
                codigo: Math.random().toString(36).substring(2, 9),
                autor,
                time,
                nombreTest,
                preguntasArray,
            }
            const tests = JSON.parse(localStorage.getItem('tests'))
            if (tests) {
                tests.push(guardar)
                localStorage.setItem('tests', JSON.stringify(tests))
            } else {
                localStorage.setItem('tests', JSON.stringify([guardar]))
            }
            reset()
            setPreguntasArray([])
            alert('Se Ha Guardado con Exito')
            navigate('/')
        }
    }



    return (
        <>
            <Container>
                <h1 className="text-center">Crear una Evaluacion</h1>
                <Form className="mt-5">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre del Test</Form.Label>
                                <Form.Control {...register('nombreTest')} type="text" placeholder="Nombre del Test" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Autor del Test</Form.Label>
                                <Form.Control {...register('autor')} type="text" placeholder="Autor del Test" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>{`Duracion del Test `}
                                    <Form.Text className="text-muted">(Ingreselo en Minutes)</Form.Text>
                                </Form.Label>
                                <Form.Control {...register('time')} type="number" placeholder="Duracion de Test" />
                            </Form.Group>
                        </Col>

                        <Row>
                            <Col>
                                <Row>
                                    <Col className="d-flex justify-content-end">

                                        <Button variant="outline-info" className=" mb-3 me-3" onClick={handleSubmit(handleCreateTest)}>
                                            Guardar Cambios
                                        </Button>


                                        <Button variant="outline-primary" className="mb-3 " onClick={handleShow}>
                                            Crear Preguntas
                                        </Button>

                                    </Col>
                                </Row>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Pregunta</th>
                                            <th>Respuestas</th>
                                            <th>Respuesta Correcta</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            preguntasArray.map((pregunta, index) => (
                                                <tr key={index}>
                                                    <td>{pregunta.pregunta}</td>
                                                    <td>{`${pregunta.respuesta1} ${pregunta.respuesta2} ${pregunta.respuesta3} ${pregunta.respuesta4}`}</td>
                                                    <td>{pregunta.respuestaCorrecta}</td>
                                                    <td><Button variant="outline-danger" onClick={() => eliminar(index)}>Eliminar</Button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Row>
                </Form>
                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Crear Pregunta</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Pregunta</Form.Label>
                                <Controller
                                    name="pregunta"
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ingrese su pregunta"
                                                    autoFocus
                                                    {...field}
                                                />
                                                {
                                                    errors.pregunta && <p role="alert" className="text-danger">Este campo esta vacio.</p>
                                                }
                                            </>
                                        )
                                    }}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 gap-3"
                                controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Respuesta 1:</Form.Label>
                                <Controller
                                    name={'respuesta1'}
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <>
                                                <InputRespuestas
                                                    active={active[name]}
                                                    onChange={(e) => onChangeText(e, onChange, name)}
                                                    inputRef={ref}
                                                    control={control}
                                                    name={name}
                                                    onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                    nameRadio='repuestaCorrecta'
                                                />
                                                {
                                                    errors.respuesta1 && <p role="alert" className="text-danger">Este campo esta vacio.</p>
                                                }
                                            </>
                                        )
                                    }}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 gap-3"
                                controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Respuesta 2:</Form.Label>
                                <Controller
                                    name={'respuesta2'}
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <>
                                                <InputRespuestas
                                                    active={active[name]}
                                                    onChange={(e) => onChangeText(e, onChange, name)}
                                                    inputRef={ref}
                                                    control={control}
                                                    name={name}
                                                    onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                    nameRadio='repuestaCorrecta'
                                                />
                                                {
                                                    errors.respuesta2 && <p role="alert" className="text-danger">Este campo esta vacio.</p>
                                                }
                                            </>
                                        )
                                    }}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 gap-3"
                                controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Respuesta 3:</Form.Label>
                                <Controller
                                    name={'respuesta3'}
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <>
                                                <InputRespuestas
                                                    active={active[name]}
                                                    onChange={(e) => onChangeText(e, onChange, name)}
                                                    inputRef={ref}
                                                    control={control}
                                                    name={name}
                                                    onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                    nameRadio='repuestaCorrecta'
                                                />
                                                {
                                                    errors.respuesta3 && <p role="alert" className="text-danger">Este campo esta vacio.</p>
                                                }
                                            </>
                                        )
                                    }}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 gap-3"
                                controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Respuesta 4:</Form.Label>
                                <Controller
                                    name={'respuesta4'}
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, name, ref } }) => {
                                        return (
                                            <>
                                                <InputRespuestas
                                                    active={active[name]}
                                                    onChange={(e) => onChangeText(e, onChange, name)}
                                                    inputRef={ref}
                                                    control={control}
                                                    name={name}
                                                    onChangeTwo={() => actualizarRespuestaCorrecta(name)}
                                                    nameRadio='repuestaCorrecta'
                                                />
                                                {
                                                    errors.respuesta4 && <p role="alert" className="text-danger">Este campo esta vacio.</p>
                                                }
                                            </>
                                        )
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default CreateTest;