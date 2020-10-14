import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { HomePage, DetailPage } from './pages/'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App() {

  const NotFoundPage = () => {
    return (
      <div className="not-found">
        <h1> Not Found Page</h1>
      </div>
    )
  }

  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" name="Main Page" component={HomePage} />
        <Route path="/detail/:id" name="Detail Page" component={DetailPage} />
        <Route path="*" name="Not Found Page" component={NotFoundPage} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
