import { useContext, useEffect } from "react";
import './style.css'
import { KahootContext } from "../../context";
import { NavLink } from "react-router-dom";

const Temporizador = ({ time, setFinish }) => {


    const {
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds
    } = useContext(KahootContext)


    useEffect(() => {
        const horas = parseInt(time / 60)
        const minutos = time - (horas * 60)
        setHours(minutos == 0 ? horas - 1 : horas)
        setMinutes(minutos == 0 ? 59 : minutos - 1)
    }, [time])



    useEffect(() => {
        function play() {
            setSeconds(seconds - 1)
        }
        if (seconds > 0) {
            var intervalID = setInterval(play, 1000)
            setTimeout(() => {
                clearInterval(intervalID)
            }, 1000)
        } else if (minutes > 0) {
            setMinutes(minutes - 1)
            setSeconds(59)
        } else if (hours > 0) {
            setHours(hours - 1)
            setMinutes(59)
            setSeconds(59)
        } else {
            setFinish(true)
        }
    }, [seconds])


    return (
        <>
            <div className="container-fluid">
                <div className="mt-5">
                    <NavLink to='/' className='navLink text-black text-decoration-none '>
                        Home
                    </NavLink>
                </div>
                <div className="hourglassBackground ">
                    <div className="hourglassContainer">
                        <div className="hourglassCurves"></div>
                        <div className="hourglassCapTop"></div>
                        <div className="hourglassGlassTop"></div>
                        <div className="hourglassSand"></div>
                        <div className="hourglassSandStream"></div>
                        <div className="hourglassCapBottom"></div>
                        <div className="hourglassGlass"></div>
                    </div>
                </div>
                <div className="temporizador text-center fs-1 fst-italic ">
                    <i className="bi bi-hourglass-split "></i>
                    {`${hours}: ${minutes}: ${seconds}`}
                </div>
            </div>
        </>
    );
}

export default Temporizador;