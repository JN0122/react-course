import {Fragment, Component} from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import {UsersContext} from "../context/users-context";

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      filteredUsers: []
    }
  }

  searchChangeHandler(event) {
    this.setState({searchTerm: event.target.value});
  }

  componentDidMount() {
    this.setState({filteredUsers: this.context.users});
  }

  componentDidUpdate(_, prevState) {
    if(prevState.searchTerm === this.state.searchTerm) return;
    this.setState({
      filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))
    });
  }

  render() {
    return (
        <Fragment>
          <div className={classes.finder}>
            <input type='search' onChange={this.searchChangeHandler.bind(this)} />
          </div>
          <Users users={this.state.filteredUsers} />
        </Fragment>
    );
  }
}

export default UserFinder;