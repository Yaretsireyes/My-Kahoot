import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const KahootContext = createContext()

export const KahootProvider = ({ children }) => {


    /*Estadors*/
    /*Componentes*/
    /*Componente MostrarPreguntas*/
    const [preguntas, setPreguntas] = useState(JSON.parse(localStorage.getItem('tests')))
    const [test, setTest] = useState()
    const [siguiente, setSiguiente] = useState(0)
    const [correctas, setCorrectas] = useState(0)
    const [incorrectas, setIconrrectas] = useState(0)
    const [finish, setFinish] = useState(false)

    /*Component Temporizador*/
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(59)

    /*Pages*/
    /*Pages CreateTest*/
    const [show, setShow] = useState(false);
    const [active, setActive] = useState({ respuesta1: true, respuesta2: true, respuesta3: true, respuesta4: true })
    const [preguntasArray, setPreguntasArray] = useState([])


    /*Pages LaoyutClient*/
    const [notFount, setNotFount] = useState(false)
    const [testObjeto, setTestObjeto] = useState({})

    /*Pages StartGame*/
    const [count, setCount] = useState(3)
    const [showTrue, setShowTrue] = useState(true)


    /*Funciones*/
    /*MostrarPreguntas*/
    const handleButton = (value) => {
        if (test.preguntasArray.length - 1 > siguiente) {
            setSiguiente(siguiente + 1)
        } else {
            setFinish(true)
        }
        if (test.preguntasArray[siguiente]?.respuestaCorrecta == value) {
            setCorrectas(correctas + 1)
        } else {
            setIconrrectas(incorrectas + 1)
        }
    }

    /*CreateTest*/

    const { register, control, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            pregunta: '',
            respuesta1: '',
            respuesta2: '',
            respuesta3: '',
            respuesta4: '',
            respuestaCorrecta: '',
        }
    })

    const handleClose = () => {
        setShow(false);
        setActive({
            respuesta1: true,
            respuesta2: true,
            respuesta3: true,
            respuesta4: true,
        })
        reset({
            pregunta: '',
            respuesta1: '',
            respuesta2: '',
            respuesta3: '',
            respuesta4: '',
            respuestaCorrecta: '',
        })
    }
    const handleShow = () => setShow(true);


    const actualizarRespuestaCorrecta = (name) => {
        setValue('respuestaCorrecta', getValues(name))
    }


    const onChangeText = (event, onChange, name) => {

        if (event.target.value != '') {
            active[name] = false

            setActive({ ...active })
        } else {
            active[name] = true
            setActive({ ...active })
        }
        onChange(event.target.value)
    }



    const onSubmit = (data) => {
        const { autor, time, nombreTest, ...dataFilter } = data
        setPreguntasArray([...preguntasArray, dataFilter])
        handleClose()
    }

    const eliminar = (index) => {
        const filtrar = preguntasArray.filter((item, i) => i !== index)
        setPreguntasArray(filtrar)
    }


    /*LayoutAdmin*/
    const obtener = JSON.parse(localStorage.getItem('tests'))

    const CopyLink = (code) => {
        navigator.clipboard.writeText(`${window.location}game/${code}`)
    }




    return (
        <>
            <KahootContext.Provider value={{
                /*Componente MostrarPreguntas*/
                preguntas,
                setPreguntas,
                test,
                setTest,
                siguiente,
                setSiguiente,
                correctas,
                setCorrectas,
                incorrectas,
                setIconrrectas,
                finish,
                setFinish,
                /*Componente Temporizador*/
                hours,
                setHours,
                minutes,
                setMinutes,
                seconds,
                setSeconds,
                /*Pages CreateTest*/
                show,
                setShow,
                active,
                setActive,
                preguntasArray,
                setPreguntasArray,
                /*Pages LayourAdmin*/
                obtener,
                /*Pages LayoutClient*/
                notFount,
                setNotFount,
                testObjeto,
                setTestObjeto,
                /*Pages StartGame*/
                count,
                setCount,
                showTrue,
                setShowTrue,
                /*Funciones*/
                handleButton,
                CopyLink,
                handleClose,
                handleShow,
                actualizarRespuestaCorrecta,
                onChangeText,
                onSubmit,
                eliminar,
                register,
                control,
                handleSubmit,
                setValue,
                getValues,
                reset,
                formState: { errors }
            }}>
                {children}
            </KahootContext.Provider>
        </>
    )
}