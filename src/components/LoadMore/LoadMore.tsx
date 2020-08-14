import React, { FC } from 'react';
import './LoadMore.scss';

import { connect } from "react-redux";

interface Props {
  loadMore: Function;
  loadedAmount: number;
  maxLimit: number;
  totalItems: number
}

const LoadMore: FC<Props> = ({loadMore, loadedAmount, maxLimit, totalItems}) => {
  return loadedAmount + maxLimit < totalItems ? <button onClick={() => loadMore()} className="button btn-more">load more</button>
    : null
}

const mapStateToProps = ({application}) => {
  return {
    maxLimit: application.maxLimit,
    totalItems: application.totalItems
  }
}

export default connect(mapStateToProps)(LoadMore);