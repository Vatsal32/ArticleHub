import React, {Component} from "react";
import {connect} from "react-redux";
import {handleLogoutRequest} from "../../store/actions/UsersAction";
import {NavLink, Link} from "react-router-dom";
import './NavigationBar.css';

class NavigationBar extends Component {
    render() {
        const userLinks = (
                <div>
                    <span className="text-white">Hello, {this.props.authenticatedUser} &ensp;</span>
                    <NavLink className="form-control me-2 btn btn-success logout" type="button" to="/"
                             onClick={this.props.handleLogoutRequest}>
                        <strong>Logout</strong>
                    </NavLink>
                </div>
        );

        const guestLinks = (
            <div className='d-flex'>
                <NavLink className="form-control me-2 btn btn-outline-success mr-2" type="button" to="/login">
                    <strong>Login</strong>
                </NavLink>
                <NavLink className="form-control me-2 btn btn-success" type="button" to="/signup">
                    Signup
                </NavLink>
            </div>
        );
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid d-flex">
                    <Link to={'/'} className='navbar-brand px-3'><i className="fas fa-blog fa-lg"> </i> &ensp;Blogipedia</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#myNavBar" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="brand collapse navbar-collapse" id="myNavBar">
                        <form className="buttons">
                            {this.props.isAuthenticated ? userLinks : guestLinks}
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.users.isAuthorized,
        authenticatedUser: state.users.authorizedUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogoutRequest: () => dispatch(handleLogoutRequest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);