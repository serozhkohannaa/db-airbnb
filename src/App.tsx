import React from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom';

import MainPage from "./pages/MainPage/MainPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
	<div className="page">
	  <Header/>
	  <div className="page-content">
		<Switch>
		  <Route path='/' component={MainPage}/>
		</Switch>
	  </div>
	  <Footer/>
	</div>
  );
}

export default App;
