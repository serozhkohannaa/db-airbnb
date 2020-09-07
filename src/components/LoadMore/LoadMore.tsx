import React, { FC } from 'react';
import './LoadMore.scss';

import { connect } from "react-redux";

interface Props {
  loadMore: Function;
}

const LoadMore: FC<Props> = ({loadMore}) => {
  return  <button onClick={() => loadMore()} className="button btn-more">load more</button>
}

const mapStateToProps = ({application}) => {
  return {
    maxLimit: application.maxLimit,
    totalItems: application.totalItems
  }
}

export default connect(mapStateToProps)(LoadMore);