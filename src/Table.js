import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';

const propTypes = {
  striped: React.PropTypes.bool,
  bordered: React.PropTypes.bool,
  condensed: React.PropTypes.bool,
  hover: React.PropTypes.bool,
  responsive: React.PropTypes.bool,
};

const defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false,
};

class Table extends React.Component {
  render() {
    const {
      striped,
      bordered,
      condensed,
      hover,
      responsive,
      className,
      ...props,
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'striped')]: striped,
      [prefix(bsProps, 'bordered')]: bordered,
      [prefix(bsProps, 'condensed')]: condensed,
      [prefix(bsProps, 'hover')]: hover,
    };

    const table = (
      <table
        {...elementProps}
        className={classNames(className, classes)}
      />
    );

    if (responsive) {
      return (
        <div className={prefix(bsProps, 'responsive')}>
          {table}
        </div>
      );
    }

    return table;
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default bsClass('table', Table);
