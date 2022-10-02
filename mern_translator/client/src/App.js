import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import './App.css'
import { Home, Novel, AddNovel } from '@app/views/index.js'
// import { getNovels } from './actions/novels'

// import PostDetails from './components/PostDetails/PostDetails';
// import Navbar from './components/Navbar/Navbar';
// import Auth from './components/Auth/Auth';
// import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
// import { Home } from './views/index'
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
        <Navbar />
        <Switch>
           <Route path="/" exact component={() => <Redirect to="/novels" />} />
          <Route path="/novels" exact component={Home} />
        </Switch>
    </BrowserRouter>
  );
};
/** 
           <Route path="/" exact component={() => <Redirect to="/posts" />} />

          <Route path="/posts" exact component={Home} />

          <Route path="/posts/search" exact component={Home} />

          <Route path="/posts/:id" exact component={PostDetails} />

          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />

          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
*/
export default App;
