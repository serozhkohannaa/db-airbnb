import React, { FormEvent, FC } from 'react';
import './Input.scss';

import SearchIcon from '../../assets/img/search.svg';

interface Props {
  searchValue?: HTMLInputElement | null;
  setSearch: Function
}

const Input: FC<Props> = ({searchValue, setSearch}) => {

  const handleSearch = (e: FormEvent) => {
	e.preventDefault();
	setSearch(searchValue?.value);
  }

  return <form className='input-wrapper' onSubmit={handleSearch}>
	<div className="search-icon">
	  <img src={SearchIcon} alt="search-icon"/>
	</div>
	<input type="text" ref={(input) => searchValue = input} className="input-field" placeholder='search by name'/>
  </form>
}

export default Input;