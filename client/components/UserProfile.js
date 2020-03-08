import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../redux/thunks/user'

class UserProfile extends Component {
  async componentDidMount() {
    await this.props.getUser()
  }

  render() {
    return (
      <div className="user-profile">
        <h5 className="title"> User Profile </h5>
        <hr />
        <span className="user-profile-item">
          Name: {`${this.props.user.firstName} `}
          {this.props.user.lastName}
        </span>
        <div className="user-profile-item">Email: {this.props.user.email}</div>
        <div className="user-profile-item">
          Address: {this.props.user.address}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  console.log('state in UsrPro', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
