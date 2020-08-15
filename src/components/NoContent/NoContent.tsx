import React, { FC } from 'react';
import './NoContent.scss';

interface Props {
  refreshSearch: Function;
}

const NoContent: FC<Props> = ({refreshSearch}) => {
  return <div className="no-content">
	<p className='title'>Nothing to display</p>

	<button className="button btn-refresh" onClick={() => refreshSearch()}>
	  reset search
	</button>
  </div>
}

export default NoContent;