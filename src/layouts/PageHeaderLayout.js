import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHeaderLayout.less';

const PageHeaderLayout = ({
  children, wrapperClassName, top, offsetTop, ...restProps
}) => (
  <div className={wrapperClassName}>
    {children ? <div className={styles.content}><h1>{restProps.title}</h1>{children}</div> : null}
  </div>
);

PageHeaderLayout.defaultProps = {
  children: undefined,
  wrapperClassName: undefined,
  top: undefined,
  offsetTop: undefined,
};

PageHeaderLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  wrapperClassName: PropTypes.string,
  top: PropTypes.object,
  offsetTop: PropTypes.number,
};

export default PageHeaderLayout;

