import React from "react";

const ModalButton = (props) => {
    return (
        <div>
            <button className="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                {props.buttonValue}
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            {props.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.onInvalidClick}>
                                No
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.onValidClick}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalButton;