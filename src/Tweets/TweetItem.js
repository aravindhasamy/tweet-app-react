import React from 'react';
import classes from "./Tweet.module.css";

function TweetItem(props) {
    return (
        <div className={classes.tweet}>
           
            <span >{props.tweet}</span>
            <button onClick={props.onRemove} className={classes.delete}>Delete</button>
        </div>
    );
}

export default TweetItem;