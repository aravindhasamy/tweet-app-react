import React, { useEffect, useState } from "react";
import classes from "./Tweet.module.css";
import TweetItem from "./TweetItem";

import { Link } from "react-router-dom";

function Timeline(props) {
  const [tweetList, setTweetList] = useState([]);
  const [useEffectDependency, setUseUffectDependency] = useState();
  useEffect(() => {
    async function fetchData() {
      let url = "https://aravind-tweet-app.herokuapp.com/tweets";

      let response = await fetch(url);

      let tweets = await response.json();
      console.log("Timeline_tweets", tweets);
      setTweetList(tweets);
    }
    fetchData();
  }, [useEffectDependency]);

  //remove tweet handler
  const removeTweetHandler = async (tweetItem) => {
    let confirmDelete = confirm("Are you sure want to delete this tweet?")
    if(confirmDelete) {
      let url = `https://aravind-tweet-app.herokuapp.com/tweets/${tweetItem._id}`;
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      setUseUffectDependency(tweetItem);
    }
    
   
  };

  //update tweet handler
  const updateTweetHandler = async (id, updatedTweet) => {
  
    let url = `https://aravind-tweet-app.herokuapp.com/tweets/${id}`;

    let requestBody = {
      content: updatedTweet,
    };

    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(requestBody),
    });
    setUseUffectDependency(updatedTweet);
  };

  const Tweets = tweetList.map((tweet) => (
    <TweetItem
      id={tweet._id}
      tweet={tweet.content}
      onRemove={removeTweetHandler.bind(null, tweet)}
      updateTweetField={updateTweetHandler}
    />
  ));

  return (
    <div className="App">
      <div className={classes.timeline}>
        <h2>TimeLine</h2>
        <ul>{Tweets}</ul>
        <Link to="/create-tweet">
          <button type="button" className={classes.button}>
            New Tweet
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Timeline;
