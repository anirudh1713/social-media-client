import React from 'react';

export default function connectRoute(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}