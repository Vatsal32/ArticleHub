import * as actionTypes from './actionTypes';

export const getAllArticles = () => {
    return dispatch => {
        fetch('/api/articles').then(res => res.json()).then(res => {
            localStorage.setItem('AllArticles', JSON.stringify(res.articles));
            dispatch({type: actionTypes.GOT_ALL_ARTICLES, articles: res.articles});
        });
    }
}

export const getMyArticles = () => {
    return dispatch => {
        fetch('/api/articles/myarticles', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            method: 'get'
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('MyArticles', JSON.stringify(res.articles));
                dispatch({type: actionTypes.GET_MY_ARTICLES, myArticles: res.articles})
            });
    }
}

export const submitArticle = (newArticle) => {
    return dispatch => {
        console.log(JSON.stringify(newArticle));
        return fetch('api/articles/add', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken'),
                'Content-type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(newArticle)
        }).then(res => res.json())
            .then(res => {
                dispatch({type: actionTypes.CREATED_ARTICLE, articleId: res.id});
            });
    }
}

export const getTheArticle = (articleId) => {
    return dispatch => {
        fetch(`/api/articles/${articleId}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json'
            }, method: 'get'
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('currentArticle', JSON.stringify(res.article));
                dispatch({type: actionTypes.GOT_THE_ARTICLE, theArticle: res.article});
            });
    }
}

export const deleteTheArticle = (articleId) => {
    return dispatch => {
        fetch(`/api/articles/delete/${articleId}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json'
            }, method: 'delete'
        })
            .then(res => res.json())
            .then(res => {
                localStorage.removeItem('currentArticle');
                dispatch({type: actionTypes.DELETED_THE_ARTICLE});
            });
    }
}

export const editTheArticle = (editedArticle) => {
    return dispatch => {
        fetch(`/api/articles/edit/${editedArticle._id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json'
            }, method: 'post',
            body: JSON.stringify({
                title: editedArticle.title,
                description: editedArticle.description,
                author: editedArticle.author,
                body: editedArticle.body
            })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                dispatch({type: actionTypes.CREATED_ARTICLE});
            });
    }
}