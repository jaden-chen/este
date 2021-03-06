/* @flow weak */
// Higher order component for Facebook XFBML.
// Examples
//  https://gist.github.com/steida/04a39dfa1043e1451044ba8370743b0c
//  https://gist.github.com/steida/b19a1858e38007651a616ae44244ca52
import React, { Component } from 'react';

const xfbml = (WrappedComponent) =>
  class Wrapper extends Component {

    onWrappedComponentRef: Function;
    el: Element;
    _isMounted: boolean;

    constructor() {
      super();
      this.onWrappedComponentRef = this.onWrappedComponentRef.bind(this);
    }

    parseXfbmlAsap() {
      if (window.FB) {
        window.FB.XFBML.parse(this.el);
        return;
      }
      const fbAsyncInit = window.fbAsyncInit;
      // Aspect Oriented Programming ftw.
      window.fbAsyncInit = () => {
        fbAsyncInit();
        if (!this._isMounted) return;
        window.FB.XFBML.parse(this.el);
      };
    }

    componentDidMount() {
      this._isMounted = true;
      this.parseXfbmlAsap();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    onWrappedComponentRef(el) {
      this.el = el;
    }

    render() {
      return (
        <WrappedComponent {...this.props} ref={this.onWrappedComponentRef} />
      );
    }

  };

export default xfbml;
