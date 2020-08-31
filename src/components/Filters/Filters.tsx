import React, { FC, FormEvent, useState } from 'react';
import './Filters.scss';
import { PriceRange } from "../../constants/score.interface";
import { ParamsInterfaces } from "../../constants/params.interfaces";
import { FiltersInterface } from "../../constants/filters.interface";

import { connect } from 'react-redux';

interface Props {
  typeValue?: HTMLInputElement | null;
  policyValue?: HTMLInputElement | null;
  setFilter: Function;
  priceRange: PriceRange;
  propertyTypes: ParamsInterfaces;
  cancellation_policy: ParamsInterfaces;
}

const Filters: FC<Props> = ({ typeValue, policyValue, setFilter, priceRange, propertyTypes, cancellation_policy}) => {
  const [price, setPriceValue] = useState(2499);
  const [checkedValues, setChecked] = useState();
  const [checkedPolicy, setCancellation] = useState();
  const [isHighScored, setHighScored] = useState(false);

  let filterParams: FiltersInterface = {price, isHighScored};

  const handleSubmit = (e: FormEvent) => {
	e.preventDefault();

	filterParams.price = price;
	filterParams.property_type = checkedValues?.length > 0 ? checkedValues : propertyTypes;
	filterParams.cancellation_policy = checkedPolicy?.length > 0 ? checkedPolicy : cancellation_policy;
	filterParams.isHighScored = isHighScored;

	setFilter(filterParams);
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

  const handlePolicyChange = (type: string) => (e: FormEvent) => {
	setCancellation(type);
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

  const renderPolicyInputs = () => {
    if (cancellation_policy) {
	  // @ts-ignore
      return cancellation_policy.map((item, i) => {
        return <div key={i} className='input'>
		  <input onChange={handlePolicyChange(item)} name={'policy-type'} ref={(input) => policyValue = input} id={`cancellation${i}`} type="radio"/>
		  <label htmlFor={`cancellation${i}`}>{item}</label>
		</div>
	  })
	}
  }

  const handleReviewCheck = (e) => {
	setHighScored(!isHighScored);
  }

  const handleValueChange = (e) => {
	setPriceValue(e.target.value);
  }

  return <form className='filters' onSubmit={handleSubmit}>
	<div className="option option-price">
	  <div className="title">
		Price
	  </div>
	  <div className="input">
		<input onChange={handleValueChange} value={price} type="range" min={priceRange?.min} max={priceRange?.max} step={10}
			   list="tickmarks"/>
		<datalist id="tickmarks" className='data-list'>
		  <option value={priceRange?.min} label={priceRange?.min?.toString()}>{priceRange?.min}</option>
		  <option value={priceRange?.max} label={priceRange?.max?.toString()}>{priceRange?.max}</option>
		</datalist>
		<input type="text" className='input-value' value={price} disabled/>
	  </div>
	</div>
	<div className="option option-type">
	  <div className="title">Property type</div>
	  <div className="inputs-wrapper">
		{renderInputs()}
	  </div>
	</div>
	<div className="option option-policy">
	  <div className="title">
		Cancellation Policy
	  </div>
	  <div className="inputs-wrapper">
		{renderPolicyInputs()}
	  </div>
	</div>
	<div className="option option-review">
	  <div className="title">Review score</div>
	  <div className="input">
		<input checked={isHighScored} onChange={handleReviewCheck} id={'high-scored'} type="checkbox" />
		<label htmlFor="high-scored">High scored</label>
	  </div>
	</div>
	<button className="button is-small primary">Apply</button>
  </form>
}

const mapStateToProps = ({params}) => {
  return {
	propertyTypes: params.property_type,
	cancellation_policy: params.cancellation_policy
  }
}

export default connect(mapStateToProps)(Filters);