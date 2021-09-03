import React, {Component} from "react";
import {connect} from 'react-redux';
import {getAllArticles, getMyArticles} from '../../store/actions/ArticleActions';
import WrappedLink from '../../components/WrappedLink/WrappedLink';
import Article from '../../components/Article/Article'
import './Home.css';

class Home extends Component {
    state = {
        showMyArticles: false
    }

    toggleShowMyArticles = () => {
        this.setState((prevState) => {
            return {
                showMyArticles: !prevState.showMyArticles
            };
        });
    }

    async componentDidMount() {
        this.props.initArticle();
        if (this.props.isAuthorized) {
            await this.props.getMyArticles();
        }
    }

    date(date1) {
        date1 = new Date(date1);
        return date1.toDateString();
    }

    render() {
        let allArticles = this.props.allArticles;
        allArticles = allArticles.map(article => (
            <Article key={article._id} id={article._id} title={article.title} description={article.description}
                     addedOn={this.date(article.addedOn)}/>
        ));

        let myArticles = [];
        if (this.props.isAuthorized && this.state.showMyArticles) {
            if (this.props.myArticles) {
                myArticles = [...this.props.myArticles];
            }
            myArticles = myArticles.map(article => (
                <Article key={article._id} id={article._id} title={article.title} description={article.description}
                         addedOn={this.date(article.addedOn)}/>
            ));
        }

        const showMyArticlesLink = (<WrappedLink to={''}
                                                 buttonClasses={['btn', 'btn-outline-info', 'mb-3', 'ms-3', 'MyArticlesButton']}
                                                 onClick={this.toggleShowMyArticles}>{this.state.showMyArticles ? 'All Articles' : 'My Articles'}</WrappedLink>);

        return (
            <div className="container mt-3">
                <div className="main px-3 py-4 px-sm-4 py-sm-5 rounded-3 mb-3">
                    <div className="display-4 jumbotron-header">
                        <h1 style={{'flex': '1 0 auto'}}>{this.state.showMyArticles ? "My Articles" : "All Articles"}</h1>
                        <WrappedLink to={this.props.isAuthorized ? "/create" : "/login"}
                                     buttonClasses={['btn', 'btn-primary', 'mb-3', 'AddArticleButton']}><i
                            className="fas fa-plus"> </i>&ensp;Add</WrappedLink>
                        {this.props.isAuthorized && showMyArticlesLink}
                    </div>
                    <hr className="my-4"/>
                    <div className="container-fluid Articles">
                        {this.props.isAuthorized && this.state.showMyArticles ? myArticles : allArticles}
                    </div>
                    <div className="End">
                        <WrappedLink to="/articles/create"
                                     buttonClasses={['btn', 'btn-primary', 'mr-3', 'AddArticleButtonAtEnd']}><i
                            className="fas fa-plus"> </i>&ensp;Add</WrappedLink>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allArticles: state.articles.articles,
        myArticles: state.articles.myArticles,
        isAuthorized: state.users.isAuthorized
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initArticle: () => dispatch(getAllArticles()),
        getMyArticles: () => dispatch(getMyArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);