import React, { FC } from "react";
import './Hero.scss';

interface Props {
  heroText: string;
}

const Hero: FC<Props> = ({heroText}) => {
  return <section className='hero'>
	<div className="container">
	  <div className="hero-text">
		<h1 data-testid='hero-text' className='headline'>
		  {heroText}
		</h1>
	  </div>
	  <div className="hero-img">
		img
	  </div>
	</div>
  </section>
}

export default Hero;