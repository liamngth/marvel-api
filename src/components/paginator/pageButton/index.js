import React from 'react';
import PropTypes from 'prop-types';

const PageButton = (props) => (
  <li className={props.current === props.page ? 'active': ''}>
    <button href="#" onClick={() => props.clickHandler(props.page)}>{props.page}</button>
  </li>
);

PageButton.propTypes = {
  page: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  clickHandler: PropTypes.func,
};

PageButton.defaultProps = {
  clickHandler: () => {},
};

export default PageButton;
