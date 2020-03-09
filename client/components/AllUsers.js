import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotUsers} from '../redux/thunks/user'

class AllUsers extends Component {
  async componentDidMount() {
    await this.props.getUsers()
  }
  render() {
    const allUsers = this.props.users ? (
      this.props.users.map(user => {
        return (
          <div key={user.id}>
            <div className="user">
              <span>
                {`${user.firstName}
                ${user.lastName}`}
              </span>
              <span>{user.address} </span>
              <span>{user.email} </span>
            </div>
          </div>
        )
      })
    ) : (
      <p>Your users are empty</p>
    )
    return (
      <div className="users">
        <div>
          <h5 className="title">All Users</h5>
          <ul>{allUsers}</ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(gotUsers())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
