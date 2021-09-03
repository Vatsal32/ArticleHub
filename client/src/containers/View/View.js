import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteTheArticle, getTheArticle} from "../../store/actions/ArticleActions";
import {NavLink, Redirect} from "react-router-dom";
import ModalButton from "../../components/ModalButton/ModalButton";

class View extends Component {
    state = {
        validId: false,
    }

    date(date1) {
        if (date1 === null) {
            return null;
        }
        date1 = new Date(date1);
        return date1.toDateString();
    }

    handleDeleteRequest = () => {
        const {match: {params}} = this.props;
        this.props.deleteArticle(params.id);
        this.props.history.push('/');
    }

    No() {
        console.log("NO Pressed");
    }

    async componentDidMount() {
        const {match: {params}} = this.props;
        if (this.props.isAuthorized) {
            await this.props.initArticle(params.id);
            // console.log(this.props.theArticle);
            this.setState((prevState) => {
                return {
                    ...prevState,
                    validId: true
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    validId: false
                };
            });
        }
    }

    render() {
        if ((!this.state.validId) && (!this.props.isAuthorized)) {
            return (<Redirect to="/login"/>);
        }
        const {match: {params}} = this.props;
        let editAndDeleteButton = (
            <div className="d-flex align-items-center justify-content-center">
                <NavLink className="btn btn-primary m-3" to={`/edit/${params.id}`}>Edit the Article</NavLink>
                <ModalButton buttonValue="Delete" message="Are you sure you want to delete the article?"
                             onValidClick={this.handleDeleteRequest} onInvalidClick={this.No}/>
            </div>
        );
        return (
            <section className="container mt-3">
                <div className="main px-3 py-4 px-sm-4 py-sm-5 rounded-3 mb-3">
                    <h1 className="display-5 text-center">
                        <strong>{(this.props.theArticle && this.props.theArticle.title) || "View"}</strong>
                    </h1>
                    <br/>
                    <div className="d-flex flex-row-reverse">
                        <figcaption className="blockquote-footer">
                            Added On: &ensp;{this.date(this.props.theArticle && this.props.theArticle.addedOn) || "Added On"} by {(this.props.theArticle && this.props.theArticle.author) || "Author"}
                        </figcaption>
                    </div>
                    <hr className="my-4"/>
                    <div className="display-6">Description:</div> <br/>
                    <span className="lead">
                        {(this.props.theArticle && this.props.theArticle.description) || "Description"}
                    </span>
                    <br/><br/>
                    <div className="display-6">Body:</div>
                    <br/>
                    <span className="lead">
                        {(this.props.theArticle && this.props.theArticle.body) || "Body"}
                    </span>
                    <br/>
                    <hr className="my-4"/>
                    <div className="d-flex justify-content-center align-content-center">
                        <div className="flex-grow-1">
                            <NavLink to='/' className="btn btn-primary m-3">
                                <i className="fas fa-chevron-left"/>&ensp;Back
                            </NavLink>
                        </div>
                        <div>
                            {this.props.theArticle ? (this.props.theArticle.authorId === this.props.authorizedId ? editAndDeleteButton : "") : ""}
                        </div>
                    </div>
                </div>


            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.users.isAuthorized,
        authorizedId: state.users.userId,
        theArticle: state.articles.currentArticle
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        initArticle: (articleId) => dispatch(getTheArticle(articleId)),
        deleteArticle: (articleId) => dispatch(deleteTheArticle(articleId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);