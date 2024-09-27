import { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { KahootContext } from "../../context";

const LayoutAdmin = () => {

    const {
        /*Estados*/
        obtener,
        /*Funciones*/
        CopyLink,
    } = useContext(KahootContext)



    return (
        <>
            <div className="container pt-5 mt-5 text-center">
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-outline-info mb-3" to='/create'>Crear Test</Link>
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre de la Prueba</th>
                                <th>Duracion</th>
                                <th>Autor</th>
                                <th>Total Preguntas</th>
                                <th>Codigo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                obtener?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item.nombreTest}</td>
                                        <td>{item.time}</td>
                                        <td>{item.autor}</td>
                                        <td>{item.preguntasArray.length}</td>
                                        <td>{item.codigo}</td>
                                        <td><Button onClick={() => CopyLink(item.codigo)} variant={"outline-success"}>CopyLink</Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div >
        </>
    );
}

export default LayoutAdmin;