import {Component} from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showUsers: false
    };
  }

  toggleUsersHandler(){
    // merges new state with old one
    this.setState((prevState) => {
      return {showUsers: !prevState.showUsers};
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.users.length === 0)
      throw new Error("No users found!");
  }

  render() {
    const usersList = (
        <ul>
          {this.props.users.map((user) => (
              <User key={user.id} name={user.name} />
          ))}
        </ul>
    );

    return (
        <div className={classes.users}>
          <button onClick={this.toggleUsersHandler.bind(this)}>
            {this.state.showUsers ? 'Hide' : 'Show'} Users
          </button>
          {this.state.showUsers && usersList}
        </div>
    );
  }
}

export default Users;
