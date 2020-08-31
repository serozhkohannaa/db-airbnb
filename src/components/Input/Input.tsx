import React, { FormEvent, FC, useState } from 'react';
import './Input.scss';

import SearchIcon from '../../assets/img/search.svg';

interface Props {
  searchValue?: HTMLInputElement | null;
  setSearch: Function
}

const Input: FC<Props> = ({searchValue, setSearch}) => {
  const [isInvalid, setInvalid] = useState(false);

  const handleSearch = (e: FormEvent) => {
	e.preventDefault();
	if (searchValue?.value.trim().length) {
	  setInvalid(false);
	  setSearch(searchValue?.value);
	} else {
	  setInvalid(true);
	}
  }

  return <form className='input-wrapper' onSubmit={handleSearch}>
	<div className="search-icon" onClick={handleSearch}>
	  <img src={SearchIcon} alt="search-icon"/>
	</div>
	<input type="text" ref={(input) => searchValue = input} required
		   className={`input-field ${isInvalid && 'is-invalid'}`} placeholder='search by name'/>
  </form>
}

export default Input;