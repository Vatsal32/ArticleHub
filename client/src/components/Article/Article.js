import React from "react";
import './Article.css';
import image1 from '../../img/blogHeader-1.jpg';
import image2 from '../../img/blogHeader-2.jpg';
import image3 from '../../img/blogHeader-3.jpg';
import image4 from '../../img/blogHeader-4.jpg';
import WrappedLink from "../WrappedLink/WrappedLink";

const randomIndex = () => {
    return Math.floor(Math.random() * 4);
}

const article = (props) => {
    let arr = [image1, image2, image3, image4];
    return (
        <div className="card blog-card">
            <img className="card-img-top blog-header-image" src={arr[randomIndex()]} alt="Blog Header"/>
            <div className="card-body">
                <div className="card-title">
                    <h5>{props.title}</h5>
                    <span className="text-muted">Added On:&ensp;{props.addedOn}</span>
                </div>
                <p className="card-text">{props.description}</p>
                <WrappedLink  to={`/view/${props.id}`} buttonClasses={['btn', 'btn-info', 'ViewButton']}>View</WrappedLink>
            </div>
        </div>
    );
};

export default article;