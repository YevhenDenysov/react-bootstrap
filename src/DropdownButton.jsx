/** @jsx React.DOM */

import React                  from './react-es6';
import classSet               from './react-es6/lib/cx';
import BootstrapMixin         from './BootstrapMixin';
import DropdownStateMixin     from './DropdownStateMixin';
import Button                 from './Button';
import ButtonGroup            from './ButtonGroup';
import DropdownMenu           from './DropdownMenu';
import utils                  from './utils';
import ValidComponentChildren from './ValidComponentChildren';


var DropdownButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight: React.PropTypes.bool,
    dropup:    React.PropTypes.bool,
    title:     React.PropTypes.renderable,
    href:      React.PropTypes.string,
    onClick:   React.PropTypes.func,
    onSelect:  React.PropTypes.func,
    navItem:   React.PropTypes.bool
  },

  render: function () {
    var className = 'dropdown-toggle';

    var renderMethod = this.props.navItem ?
      'renderNavItem' : 'renderButtonGroup';

    return this[renderMethod]([
      this.transferPropsTo(<Button
        ref="dropdownButton"
        className={className}
        onClick={this.handleDropdownClick}
        key={0}
        navDropdown={this.props.navItem}
        navItem={null}
        title={null}
        pullRight={null}
        dropup={null}>
        {this.props.title}{' '}
        <span className="caret" />
      </Button>),
      <DropdownMenu
        ref="menu"
        aria-labelledby={this.props.id}
        pullRight={this.props.pullRight}
        key={1}>
        {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
      </DropdownMenu>
    ]);
  },

  renderButtonGroup: function (children) {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classSet(groupClasses)}>
        {children}
      </ButtonGroup>
    );
  },

  renderNavItem: function (children) {
    var classes = {
        'dropdown': true,
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <li className={classSet(classes)}>
        {children}
      </li>
    );
  },

  renderMenuItem: function (child) {
    // Only handle the option selection if an onSelect prop has been set on the
    // component or it's child, this allows a user not to pass an onSelect
    // handler and have the browser preform the default action.
    var handleOptionSelect = this.props.onSelect || child.props.onSelect ?
      this.handleOptionSelect : null;

    return utils.cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: utils.createChainedFunction(child.props.onSelect, handleOptionSelect),

        // Force special props to be transferred
        key: child.props.key,
        ref: child.props.ref
      }
    );
  },

  handleDropdownClick: function (e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

export default = DropdownButton;