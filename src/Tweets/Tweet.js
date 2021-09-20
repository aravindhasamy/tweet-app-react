import React, { useRef, useState } from "react";
import classes from "./Tweet.module.css";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import "../App.css";

const Tweet = (props) => {
    const [error, setError] = useState(false)
  let history = useHistory();
  const tweetInputRef = useRef();

const submitHandler = async (event) => {
    event.preventDefault();
    const tweet = tweetInputRef.current.value;

    if(!tweet){
        setError(true)
        return
    }
    
    let url = "https://aravind-tweet-app.herokuapp.com/tweets";

    let requestBody = {
      content: tweet,
    };


    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(requestBody),
    });
    
    // console.log("response", response);
    let result = await response.json();
    console.log("result", result);
    history.push("/");
  };

const errorHandler = () => {
    setError(false)
  }

  return (
    <div>
      <form className="App-header" onSubmit={submitHandler}>
        <p>Tweet your thoughts</p>
        {error && <p>Type Something!</p> }
        <textarea rows="2" cols="50" ref={tweetInputRef}  onChange={errorHandler}></textarea>
        <div>
          <input type="submit" value="Post" className={classes.button} ></input>

          <Link to="/">
                   <button type="button" className={classes.button}> Cancel </button> 
                </Link>
        </div>
      </form>
    </div>
  );
};

export default Tweet;
