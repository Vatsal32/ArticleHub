import React, {Component} from "react";
import {connect} from "react-redux";
import {submitArticle, getTheArticle, editTheArticle} from "../../store/actions/ArticleActions";
import {Redirect} from "react-router-dom";
import ArticleForm from "../../components/ArticleForm/ArticleForm";

class Edit extends Component {
    state = {
        wantToEdit: false,
        newArticle: {
            author: this.props.author,
        },
        errors: {}
    }

    validateChanges = (field, value) => {
        let error;
        if (value === '') {
            error = {[field]: 'This is a required field.'};
        } else {
            error = {[field]: ''};
        }
        return error;
    }

    handle_changes = async (e) => {
        const field = e.target.name;
        const value = e.target.value;
        let errors = {...this.state.errors, ...this.validateChanges(field, value)};

        this.setState(prevState => {
            return {
                ...prevState,
                newArticle: {
                    ...this.state.newArticle,
                    [field]: value
                },
                errors: {
                    ...errors
                }
            }
        });
    }

    isValid() {
        let errors = {
            ...this.state.errors
        }
        console.log(errors);
        return (Object.keys(errors).filter(field => errors[field] !== '').length === 0);
    }

    handleCreate = async (e) => {
        e.preventDefault();
        let errors = {
            ...this.state.errors
        }
        const fieldsValid = Object.keys(errors).filter(field => errors[field] !== '').length === 0;
        if (!fieldsValid) {
            return null;
        } else {
            if (this.state.wantToEdit) {
                await this.props.handleEditRequests(this.state.newArticle);
                localStorage.removeItem('MyArticles');
                this.props.history.push(`/view/${this.state.newArticle._id}`);
            } else {
                await this.props.handleCreateRequests(this.state.newArticle);
                this.props.history.push(`/view/${this.props.newArticleId}`);
            }
        }
    }

    async componentDidMount() {
        const {match: {params}} = this.props;
        if ((!(params.id === undefined)) && this.props.isAuthorized) {
            await this.props.initArticle(params.id);
            let gotArticle = {...JSON.parse(localStorage.getItem('currentArticle'))};
            // console.log(gotArticle);
            if (gotArticle !== {}) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        wantToEdit: true,
                        newArticle: {...gotArticle},
                    }
                });
            }
        }
    }

    render() {
        if (!this.props.isAuthorized) {
            return <Redirect to="/login"/>;
        }
        return (
            <div className="container mt-3">
                <div className="main px-3 py-4 px-sm-4 py-sm-5 rounded-3 mb-3">
                    <div className="display-5 text-center">
                        Create a new Article
                    </div>
                    <hr className="my-4"/>
                    <div className="container-fluid">
                        <form onSubmit={this.handleCreate}>
                            <ArticleForm onChange={this.handle_changes} defaultValue={this.state.newArticle}/>
                            <div className="d-flex align-content-center justify-content-center my-3">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const
    mapStateToProps = (state) => {
        return {
            author: state.users.authorizedUser,
            isAuthorized: state.users.isAuthorized,
            theArticle: state.articles.currentArticle,
            newArticleId: state.articles.newArticleId,
        }
    }

const
    mapDispatchToProps = (dispatch) => {
        return {
            initArticle: (articleId) => dispatch(getTheArticle(articleId)),
            handleCreateRequests: (newArticle) => dispatch(submitArticle(newArticle)),
            handleEditRequests: (editedArticle) => dispatch(editTheArticle(editedArticle))
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);