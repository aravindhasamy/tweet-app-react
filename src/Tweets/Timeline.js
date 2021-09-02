import React, { useEffect, useState } from 'react';
import classes from "./Tweet.module.css";
import TweetItem from './TweetItem';

import { Link } from 'react-router-dom';

function Timeline(props) {
    const [tweetList, setTweetList] = useState([]);
    const [useEffectDependency, setUseUffectDependency] = useState([]);
    useEffect(() => {
        async function fetchData ()  {
            let url = 'http://localhost:3005/tweets';
        
            let response = await fetch(url);
    
            let tweets = await response.json(); 
            setTweetList(tweets)
        }
        fetchData();
      }, [useEffectDependency]);

      const removeTweetHandler = async (tweetItem) => {
          setUseUffectDependency(tweetItem)

          let url = `http://localhost:3005/tweets/${tweetItem._id}`;
        let response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            }
          });
        let result = await response.json();
          console.log("result", result)
      }
    
        const Tweets = tweetList.map((tweet) => (
            <TweetItem 
            tweet={tweet.content}
            onRemove={removeTweetHandler.bind(null, tweet)}
            />
        ))

    return (
        <div className="App" >
                <div className={classes.timeline}>
                <h2>TimeLine</h2>
               
                <ul>{Tweets}</ul> 
         
                <Link to="/create-tweet">
                   <button type="button" className={classes.button}> New Tweet </button> 
                </Link>

                </div>
               
        </div>
    );
}

export default Timeline;