import React from 'react';
import './MainPage.scss';

import Hero from "../../components/Hero/Hero";
import Content from "../../components/Content/Content";

const MainPage = () => {
  return <main id='main'>
	<Hero heroText='Airbnb listenings and reviews'/>
	<div className="container">
	  <Content/>
	</div>
  </main>
}

export default MainPage;