import React from "react";
import classes from "./Tweet.module.css";
import { useState, useRef } from "react";

function TweetItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTweet, setUpdatedTweet] = useState(props.tweet);
  const tweetInputRef = useRef();

  const setCancelHandler = (event) => {
    setUpdatedTweet("");
    setIsEdit(!isEdit);
  };

  const setFieldEditable = (event) => {
    setIsEdit(!isEdit);
  };

  const updateTweet = (event) => {
    setUpdatedTweet(event.target.value);
  };

  const submitHandler = (event) => {
    setIsEdit(!isEdit);
    const tweet = tweetInputRef.current.value;
    props.updateTweetField(props.id, tweet);
  };

  return (
    <div className={classes.tweet}>
      {!isEdit && <span>{props.tweet}</span>}
      {!isEdit && (
        <button onClick={setFieldEditable} className={classes.edit}>
          Edit
        </button>
      )}
      {isEdit && (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={updatedTweet}
            onChange={updateTweet}
            name="updateTweet"
            ref={tweetInputRef}
          />
          <button type="submit" className={classes.edit}>
            Ok
          </button>
          <button
            type="button"
            onClick={setCancelHandler}
            className={classes.edit}
          >
            Cancel
          </button>
        </form>
      )}
      {!isEdit && (
        <button onClick={() => {if(window.confirm('Are you sure want to delete this tweet?')){props.onRemove()};}} className={classes.delete}>
          Delete
        </button>
        
      )}
    </div>
  );
}

export default TweetItem;

