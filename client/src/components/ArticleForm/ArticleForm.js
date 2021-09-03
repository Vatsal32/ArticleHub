import React from "react";
import InputField from '../InputField/InputField';
import InputTextArea from "../InputField/InputTextArea";

const ArticleForm = (props) => {
    return (
        <div className="main">
            <InputField key={"title"} type={"text"} label={"Title"} name={"title"}
                        defaultValue={props.defaultValue.title} onChange={props.onChange}/>
            <InputField key={"author"} type={"text"} label={"Author"} name={"author"}
                        defaultValue={props.defaultValue.author} onChange={props.onChange}/>
            <InputField key={"description"} type={"text"} label={"Description"} name={"description"}
                        defaultValue={props.defaultValue.description} onChange={props.onChange}/>
            <InputTextArea key={"body"} name={"body"} label={"Body"} className={"form-control"} rows={"10"}
                           defaultValue={props.defaultValue.body} onChange={props.onChange}/>
        </div>
    );
}

export default ArticleForm;
