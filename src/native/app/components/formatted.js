import * as reactIntl from 'react-intl';
import React, { Component } from 'react';
import Text from './Text.react';

// Create react-intl component which work in the React Native.
// It replaces the browser span with the styleable native View.
// github.com/yahoo/react-intl/issues/119
const native = WrappedComponent =>
  class Native extends Component {

    static propTypes = {
      children: WrappedComponent.propTypes.children,
      style: Text.propTypes.style,
    };

    constructor() {
      super();
      this.onTextRef = this.onTextRef.bind(this);
    }

    onTextRef(text) {
      this.text = text;
    }

    setNativeProps(nativeProps) {
      if (typeof this.props.children === 'function') return;
      this.text.setNativeProps(nativeProps);
    }

    render() {
      const { children, style, ...wrappedComponentProps } = this.props;
      const childrenAsFunction = typeof children === 'function';

      return (
        <WrappedComponent {...wrappedComponentProps}>
          {message => (
            childrenAsFunction
              ? children(message)
              : <Text ref={this.onTextRef} style={style}>{message}</Text>
          )}
        </WrappedComponent>
      );
    }

  };

export const FormattedDate = native(reactIntl.FormattedDate);
export const FormattedMessage = native(reactIntl.FormattedMessage);
export const FormattedNumber = native(reactIntl.FormattedNumber);
export const FormattedPlural = native(reactIntl.FormattedPlural);
export const FormattedRelative = native(reactIntl.FormattedRelative);
export const FormattedTime = native(reactIntl.FormattedTime);
