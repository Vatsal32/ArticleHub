import React from "react";

const InputTextArea = (props) => {
    return (
        <div className="form-floating mb-3">
            <textarea name={props.name} placeholder={props.placeholder || props.label} id="TextArea"
                      className="form-control form-control-lg" onChange={props.onChange} {...props}
                      style = {{'height': "24rem"}}/>
            <label className="label " style={{'fontSize': '1rem'}} htmlFor="TextArea">{props.label}</label>
        </div>
    );
};

export default InputTextArea;