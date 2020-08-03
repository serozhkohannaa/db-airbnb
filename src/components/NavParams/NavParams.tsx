import React, { FC } from "react";
import './NavParams.scss';
import RefreshIcon from '../../assets/img/refresh.svg';
import SortParams from "../SortParams/SortParams";

interface Props {
  amount: number;
  setUpdate: any;
  setRefresh: any;
}

const NavParams: FC<Props> = ({amount, setUpdate, setRefresh}) => {
  const setType = (type: string) => {
	setUpdate(type);
  }

  const handleRefresh = () => {
	setRefresh();
  }

  return <div className='navParams'>
	<button className="button secondary is-medium amount">
	  {amount} items
	</button>
	<button className="button refresh" onClick={handleRefresh}>
	  <img src={RefreshIcon} alt="refresh-icon"/>
	</button>
	<SortParams setSort={setType}/>
  </div>
}

export default NavParams;