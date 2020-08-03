import React, { FC } from "react";
import './NavParams.scss';
import RefreshIcon from '../../assets/img/refresh.svg';
import SortParams from "../SortParams/SortParams";
import Input from "../Input/Input";

interface Props {
  amount: number;
  setUpdate: any;
  setRefresh: any;
  setSearchRecord: any;
}

const NavParams: FC<Props> = ({amount, setUpdate, setRefresh, setSearchRecord}) => {
  const setType = (type: string) => {
	setUpdate(type);
  }

  const handleRefresh = () => {
	setRefresh();
  }

  const setSearch = (value: string) => {
	setSearchRecord(value);
  }

  return <div className='navParams'>
	<button className="button secondary is-medium amount">
	  {amount} items
	</button>
	<button className="button refresh" onClick={handleRefresh}>
	  <img src={RefreshIcon} alt="refresh-icon"/>
	</button>
	<div className="input-component">
	  <Input setSearch={setSearch}/>
	</div>
	<SortParams setSort={setType}/>
  </div>
}

export default NavParams;