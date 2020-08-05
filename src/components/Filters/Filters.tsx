import React, { FC, FormEvent, useState } from 'react';
import './Filters.scss';
import { PriceRange } from "../../constants/score.interface";
import { ParamsInterfaces } from "../../constants/params.interfaces";
import { FiltersInterface } from "../../constants/filters.interface";

import { connect } from 'react-redux';

interface Props {
  priceValue?: HTMLInputElement | null;
  typeValue?: HTMLInputElement | null;
  setFilter: any;
  priceRange: PriceRange;
  propertyTypes: ParamsInterfaces;
}

const Filters: FC<Props> = ({priceValue, typeValue, setFilter, priceRange, propertyTypes}) => {
  const [checkedValues, setChecked] = useState();
  let searchParams: FiltersInterface;

  const handleSubmit = (e: FormEvent) => {
	e.preventDefault();

	console.log(checkedValues);

	searchParams.price = priceValue?.value;
	searchParams.property_type = checkedValues;

	setFilter(priceValue?.value);
  }

  const handleTypeChange = (type: string) => (e: FormEvent) => {
	if (checkedValues?.includes(type)) {
	  setChecked(checkedValues.filter(item => item !== type));
	} else {
	  if (checkedValues) {
		setChecked([...checkedValues, type]);
	  } else {
		setChecked([type])
	  }
	}
  }

  const renderInputs = () => {
	if (propertyTypes) {
	  // @ts-ignore
	  return propertyTypes.map((item, i) => {
		return <div key={i} className='input'>
		  <input onChange={handleTypeChange(item)} ref={(input) => typeValue = input} id={`type${i}`} type="checkbox"/>
		  <label htmlFor={`type${i}`}>{item}</label>
		</div>
	  })
	}
  }

  return <form className='filters' onSubmit={handleSubmit}>
	<div className="option option-price">
	  <div className="title">
		Price
	  </div>
	  <div className="input">
		<input ref={(input) => priceValue = input} type="range" min={priceRange.min} max={priceRange.max} step={10}
			   list="tickmarks"/>
		<datalist id="tickmarks" className='data-list'>
		  <option value={priceRange.min} label={priceRange.min?.toString()}>{priceRange.min}</option>
		  <option value={priceRange.max} label={priceRange.max?.toString()}>{priceRange.max}</option>
		</datalist>
	  </div>
	  <div className="option option-type">
		<div className="title">Property type</div>
		<div className="inputs-wrapper">
		  {renderInputs()}
		</div>
	  </div>
	</div>
	<button className="button is-small primary">Apply</button>
  </form>
}

const mapStateToProps = ({params}) => {
  return {
	propertyTypes: params.propertyTypes
  }
}

export default connect(mapStateToProps)(Filters);