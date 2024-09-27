import { useContext, useEffect, useState } from "react";
import MostrarPregunta from "../../conponents/MostrarPregunta/MostrarPregunta";
import { Container } from "react-bootstrap";
import { KahootContext } from "../../context";
import './style.css'

const StartGame = () => {

    const {
        count,
        setCount,
        showTrue,
        setShowTrue,
    } = useContext(KahootContext)



    useEffect(() => {
        function myCallback() {
            setCount(count - 1)
        }
        if (count > 0) {
            let intervalID = setInterval(myCallback, 1000);
            setTimeout(() => {
                clearInterval(intervalID)
            }, 1000)
        } else {
            setShowTrue(false)
        }
    }, [count])



    return (
        <>

            <Container>
                {
                    showTrue && (
                        <>
                            <div className="loader">
                                <h1>{count}</h1>
                            </div>
                        </>
                    )
                }
                {!showTrue &&
                    <MostrarPregunta />
                }

            </Container>
        </>
    );
}

export default StartGame;