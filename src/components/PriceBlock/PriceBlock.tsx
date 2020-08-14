import React, {FC} from "react";
import './PriceBlock.scss';

interface Props {
  price: number;
  deposit: number;
  fee: number;
}

const PriceBlock: FC<Props> = ({price= 0, deposit= 0, fee= 0}) => {
  return <div className='priceBlock'>
	<div className="header">
	  <h6>Total price</h6>
	</div>
	<div className="content">
	  <div className="content-item">
		<p>Per day</p> <span>{price}$</span>
	  </div>
	  <div className="content-item">
		<p>Deposit</p> <span>{deposit}$</span>
	  </div>
	  <div className="content-item">
		<p>Cleaning</p> <span>{fee}$</span>
	  </div>
	</div>
	<div className="footer">
	  <p className="text">
		{price + deposit + fee}$
	  </p>
	</div>
  </div>
}

export default PriceBlock;