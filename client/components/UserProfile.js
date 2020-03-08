import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, updateUser} from '../redux/thunks/user'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
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
    const isEnabled =
      this.state.email.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0
    return (
      <div className="user-profile">
        <h5 className="title"> User Profile </h5>
        <hr />
        <span className="user-profile-item">
          Name: {`${this.props.user.firstName} `}
          {this.props.user.lastName}
        </span>
        <div className="user-profile-item" defaultValue={this.props.user.email}>
          Email: {this.state.email}
        </div>

        <input
          placeholder={this.props.user.email}
          name="name"
          type="email"
          value={this.state.email}
          onChange={evt => this.setState({email: evt.target.value})}
        />
        <div className="user-profile-item">
          Address: {this.props.user.address}
        </div>
        <button disabled={!isEnabled} type="submit" onClick={this.handleSubmit}>
          Update
        </button>
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
