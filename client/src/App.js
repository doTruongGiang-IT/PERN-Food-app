import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './routes';

function App() {
  const showRoutesContent = (routes) => {
    let result = [];
    if(routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} path={route.path} exact={route.exact} component={route.main} />
      })
    };
    return result;
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          {showRoutesContent(routes)}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
