import React, { FC, FormEvent } from 'react';
import './Filters.scss';

interface Props {
  priceValue?: HTMLInputElement | null;
  setFilter: any;
}

const Filters: FC<Props> = ({priceValue, setFilter}) => {

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
		<input ref={(input) => priceValue = input} type="range" min={10} max={100} step={10} list="tickmarks"/>
		<datalist id="tickmarks" className='data-list'>
		  <option value="0" label="0%">0</option>
		  <option value="100" label="100%">100</option>
		</datalist>
	  </div>
	</div>
	<button className="button is-small primary">Apply</button>
  </form>
}

export default Filters;