import React from "react";
import './InputField.css';

const inputField = (props) => {
    return (
        <div className="form-floating mb-3">
            <input type={props.type} id={props.name} name={props.name} placeholder={props.placeholder || props.label}
                   className="form-control text-black form-control-lg field" onChange={props.onChange} {...props}/>
            <label htmlFor={props.name} className="label text-black" style={{'fontSize': '1rem'}}>{props.label}</label>
        </div>
    );
};

export default inputField;