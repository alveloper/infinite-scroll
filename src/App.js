import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./routes/Main";
import Post from './routes/Post';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Main} />
      <Route path='/post/:id' component={Post} />
    </BrowserRouter>
  )
};

export default App;