import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

// gql is used to parse the graphql string queries
const TodosQuery = gql`
  query {
    todos {
      id
      text
      complete
    }
  }
`;


class App extends Component {
  handleToggle = todo => () => {
    // update todo complete in database
  };

  render() {
    const { data: { loading, todos } } = this.props;
    if (loading) {
      return null;
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ margin: "auto", width: 400 }}>
            <Paper elevation={1}>
              <List>
                {todos.map(todo => (
                  <ListItem
                    key={todo.id} role={undefined}
                    dense button onClick={this.handleToggle(todo)}
                  >
                    <Checkbox
                      checked={todo.complete}
                      tabIndex={-1}
                      disableRipple
                    />
                  <ListItemText primary={todo.text} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Comments">
                        <CommentIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        </div>
      );
    }
  }
}

// this passes the component the todos based on the query
export default graphql(TodosQuery)(App);
