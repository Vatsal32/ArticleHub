import React, {Component} from "react";
import InputField from '../../../components/InputField/InputField';
import {handleSignupRequest} from "../../../store/actions/UsersAction";
import {connect} from "react-redux";
import './Signup.css';
import {NavLink} from "react-router-dom";

const FIELDS = [
    {name: 'name', type: 'text', label: 'Name'},
    {name: 'userName', type: 'text', label: 'User Name'},
    {name: 'email', type: 'email', label: 'Email Address'},
    {name: 'password', type: 'password', label: 'Password'},
    {name: 'confirmPassword', type: 'password', label: 'Confirm Password'},
];

class Signup extends Component {
    state = {
        userDetails: {},
        errors: {}
    }

    handleChanges = async (e) => {
        const field = e.target.name;
        const value = e.target.value;

        this.setState((prevState) => {
            return {
                ...prevState,
                userDetails: {
                    ...prevState.userDetails,
                    [field]: value
                }
            };
        }, () => localStorage.setItem('SignupDetails', JSON.stringify(this.state)));
    };

    handleSignup = (e) => {
        e.preventDefault();
        this.props.handleSignupRequest(this.state.userDetails)
            .then(res => res.json())
            .then(res => {
                let errors = {...this.state.errors};
                if (res.errors) {
                    errors = {...errors, ...res.errors};
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            userDetails: {...prevState.userDetails},
                            error: errors,
                        };
                    });
                } else {
                    localStorage.removeItem('SignupDetails');
                    this.props.history.push('/login');
                }
            });
    };

    render() {
        const fields = FIELDS.map((field) => (
            <InputField key={field.name} type={field.type} label={field.label}
                        defaultValue={this.state.userDetails[field.name]} onChange={this.handleChanges}
                        name={field.name}/>
        ));

        return (
            <section className="container mt-3">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5 m-auto">
                    <div className="main px-3 py-4 px-sm-4 py-sm-5 rounded-3 mb-3">
                        <h3 className="display-6 text-center"><strong>Join Our Community!</strong></h3>
                        <hr className="my-4"/>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <form onSubmit={this.handleSignup}>
                                {fields}
                                <div className="button-container">
                                    <button type="submit group" className="btn btn-primary">Signup</button>
                                    <p className="text-muted"><br/>Already have an account? <NavLink
                                        to="/login">Login</NavLink></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSignupRequest: (userSignupDetails) => dispatch(handleSignupRequest(userSignupDetails))
    };
}

export default connect(null, mapDispatchToProps)(Signup);