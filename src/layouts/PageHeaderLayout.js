import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Affix } from "antd";
import { PageHeader } from '../components';
import styles from './PageHeaderLayout.less';

const PageHeaderLayout = ({
  children, wrapperClassName, top, offsetTop, ...restProps
}) => (
  <div className={wrapperClassName}>
    {/* {offsetTop !== undefined ?
      <Affix offsetTop={offsetTop}>
        <PageHeader {...restProps} linkElement={Link} />
      </Affix>
        :
      <PageHeader {...restProps} linkElement={Link} />
      } */}
    {children ? <div className={styles.content}>{children}</div> : null}
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

