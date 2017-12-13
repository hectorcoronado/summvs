import React, { Component } from 'react'
import { connect } from 'react-redux'

// pass a component directly in, if a user isn't auth'd, they get rerouted to the root route:
export default function(ComposedComponent) {
  class AdminAuthentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated || !this.props.isAdmin) {
        this.context.router.push('/unauthredirect')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated || !nextProps.isAdmin) {
        this.context.router.push('/unauthredirect');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      isAdmin: state.auth.isAdmin
    }
  }

  return connect(mapStateToProps)(AdminAuthentication)
}
