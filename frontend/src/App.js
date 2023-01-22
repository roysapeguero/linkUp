import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Switch, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import Groups from "./components/Groups/Groups";
import OneGroupPage from "./components/Groups/OneGroup/OneGroup";
import OneEventPage from "./components/Events/OneEvent";
import HomePage from "./components/HomePage";
import Events from "./components/Events/Events";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            {user ? <HomePage /> : <SplashPage />}
          </Route>
          <Route path='/events/:eventId'>
            <OneEventPage />
          </Route>
          <Route path='/events'>
            {user ? <HomePage /> : <Events />}
          </Route>
          <Route path='/groups/:groupId'>
            <OneGroupPage />
          </Route>
          <Route path='/groups'>
            {user ? <HomePage /> : <Groups />}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
