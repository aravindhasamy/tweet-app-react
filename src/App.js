import './App.css';
import Tweet from './Tweets/Tweet';
import Timeline from "./Tweets/Timeline"
import { Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router';



function App() {
  let history = useHistory();

  useEffect(() => {
    history.push("/")
  })
 
    return (
      <div className="App-header ">
    <Fragment  >
      
      <Switch>
     
        <Route path="/create-tweet" exact>
        <Tweet/>
        </Route >
        
        <Route path="/">
        <Timeline/>
        </Route>
        
      </Switch>
      
      
      </Fragment>
      </div>
    
  );
}

export default App;
