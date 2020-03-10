import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, updateUser} from '../redux/thunks/user'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.user.id,
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      address: this.props.user.address || '',
      email: this.props.user.email
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.getUser()
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const user = {
      id: this.state.id,
      firstName: this.state.firstName || '',
      lastName: this.state.lastName || '',
      address: this.state.address || '',
      email: this.state.email,
      admin: this.state.admin
    }

    this.props.updateUser(user)
  }

  handleChange(evt) {
    console.log('name in handleCh', evt.target)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    const isEnabled = this.state.email.length > 0
    return (
      <div className="user-profile">
        <h5 className="title"> User Profile </h5>
        <hr />
        <div className="user-profile-items">
          <div className="user-profile-item">
            First Name
            <input
              placeholder={this.props.user.firstName}
              className="user-profile-input"
              name="name"
              type="string"
              value={this.state.firstName}
              onChange={evt => this.setState({firstName: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            Last Name
            <input
              className="user-profile-input"
              placeholder={this.props.user.lastName}
              name="name"
              type="string"
              value={this.state.lastName}
              onChange={evt => this.setState({lastName: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            Email
            <input
              className="user-profile-input"
              placeholder={this.props.user.email}
              name="string"
              type="email"
              value={this.state.email}
              onChange={evt => this.setState({email: evt.target.value})}
            />
          </div>
          <div className="user-profile-item">
            Address
            <input
              className="user-profile-input"
              placeholder={this.props.user.address}
              name="name"
              type="string"
              value={this.state.address}
              onChange={evt => this.setState({address: evt.target.value})}
            />{' '}
          </div>
        </div>

        <div id="user-profile-update-div">
          <button
            id="user-profile-update-btn"
            disabled={!isEnabled}
            type="submit"
            onClick={this.handleSubmit}
          >
            Update
          </button>
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
    getUser: () => dispatch(me()),
    updateUser: (id, firstName, lastName, email) =>
      dispatch(updateUser(id, firstName, lastName, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
