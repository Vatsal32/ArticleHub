import React, {Component} from "react";
import InputField from '../../../components/InputField/InputField';
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {handleLoginRequest} from "../../../store/actions/UsersAction";
import './Login.css';

const FIELDS = [
    {name: 'userName', type: 'text', label: 'User Name'},
    {name: 'password', type: 'password', label: 'Password'}
];

class Login extends Component {
    state = {
        userCredentials: {},
        errors: {}
    }

    checkValidation = (field, value) => {
        let error;

        if (value === '') {
            error = {
                [field]: 'This is a required field. '
            }
        } else {
            error = {
                [field]: '',
            }
        }

        return error;
    }

    handleChange = async (e) => {
        const field = e.target.name;
        const value = e.target.value;

        const errors = {...this.state.errors, ...this.checkValidation(field, value)};

        this.setState((prevState) => {
            return {
                ...prevState,
                userCredentials: {
                    ...prevState.userCredentials,
                    [field]: value,
                },
                errors: {
                    ...errors
                }
            };
        }, () => sessionStorage.setItem('LoginPage', JSON.stringify(this.state.userCredentials)));
    }

    handleLogin = (e) => {
        e.preventDefault();
        let errors = {
            ...this.state.errors,
        };
        const userCredentialsValid = Object.keys(errors).filter(field => errors[field] !== '').length === 0;
        if (!userCredentialsValid) {
            return null;
        } else {
            this.props.handleLoginRequest(this.state.userCredentials)
                .then(res => {
                    if (res.errors) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                userCredentials: {...prevState.userCredentials},
                                errors: {...prevState.errors, ...res.errors}
                            }
                        });
                    } else {
                        this.props.history.push('/');
                    }
                });
        }
    }

    render() {
        if (this.props.isAuthorized) {
            return <Redirect to="/"/>;
        }

        const fields = FIELDS.map(field => (
            <InputField key={field.name} name={field.name} type={field.type} label={field.label}
                        onChange={this.handleChange}/>
        ));
        return (
            <section className="container mt-3">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5 m-auto">
                    <div className="main px-5 py-4 px-sm-4 py-sm-5 rounded-3 mb-3">
                        <h3 className="display-6 text-center mt-5"><strong>Login</strong></h3>
                        <hr className="my-4"/>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <form onSubmit={this.handleLogin}>
                                {fields}
                                <div className="button-container">
                                    <button type="submit group" className="btn btn-primary">Login</button>
                                    <p className="text-muted mb-5"><br/>Don't have an account? <NavLink
                                        to="/signup">Signup</NavLink></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.users.isAuthorized,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLoginRequest: (userLoginDetails) => dispatch(handleLoginRequest(userLoginDetails))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);