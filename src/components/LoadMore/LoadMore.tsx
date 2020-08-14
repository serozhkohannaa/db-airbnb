import React, { FC } from 'react';
import './LoadMore.scss';

interface Props {
  loadMore: Function
}

const LoadMore: FC<Props> = ({loadMore}) => {
  return <button onClick={() => loadMore()} className="button btn-more">load more</button>
}

export default LoadMore;