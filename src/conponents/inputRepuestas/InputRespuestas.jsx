import { Form, InputGroup } from "react-bootstrap";

const InputRespuestas = ({ active, onChange, onChangeTwo, nameRadio, inputRef}) => {
    return (
        <>
            <InputGroup>
                <Form.Control
                    onChange={onChange}
                    ref={inputRef}
                    aria-label="Text input with radio button"
                />
                <InputGroup.Radio disabled={active} name={nameRadio} onChange={onChangeTwo} aria-label="Radio button for following text input" />
            </InputGroup>
        </>
    );
}

export default InputRespuestas;