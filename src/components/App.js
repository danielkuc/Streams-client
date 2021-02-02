import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// Link replaces <a> in HTML but does not make a request.

import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          {/* Header not wrapped in Route so will always be visible regardless of path, contains Link so needs to be within BrowserRouter */}
          <Switch>
            <Route path ='/' exact component={StreamList} />
            <Route path ='/streams/new' exact component={StreamCreate} />
            <Route path ='/streams/edit/:id' exact component={StreamEdit} />
            <Route path ='/streams/delete/:id' exact component={StreamDelete} />
            <Route path ='/streams/:id' exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;