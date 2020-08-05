import React, { FC, FormEvent } from 'react';
import './Filters.scss';
import { PriceRange } from "../../constants/score.interface";

interface Props {
  priceValue?: HTMLInputElement | null;
  setFilter: any;
  priceRange: PriceRange;
}

const Filters: FC<Props> = ({priceValue, setFilter, priceRange}) => {

  const handleSubmit = (e: FormEvent) => {
	e.preventDefault();

	setFilter(priceValue?.value);
  }

  return <form className='filters' onSubmit={handleSubmit}>
	<div className="option option-price">
	  <div className="title">
		Price
	  </div>
	  <div className="input">
		<input ref={(input) => priceValue = input} type="range" min={priceRange.min} max='20000' step={10} list="tickmarks"/>
		<datalist id="tickmarks" className='data-list'>
		  <option value={priceRange.min} label={priceRange.min?.toString()} >{priceRange.min}</option>
		  <option value={priceRange.max} label={priceRange.max?.toString()} >{priceRange.max}</option>
		</datalist>
	  </div>
	</div>
	<button className="button is-small primary">Apply</button>
  </form>
}

export default Filters;