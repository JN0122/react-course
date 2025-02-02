import {Fragment, Component} from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      filteredUsers: DUMMY_USERS
    }
  }

  searchChangeHandler(event) {
    this.setState({searchTerm: event.target.value});
  }

  componentDidUpdate(_, prevState) {
    if(prevState.searchTerm === this.state.searchTerm) return;
    this.setState({
      filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm))
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