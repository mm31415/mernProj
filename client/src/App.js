import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
  render() {
    const { data: { loading, todos } } = this.props;
    if (loading) {
      return null;
    } else {
      return (
        <div>
          {todos.map((todo) => (
            <div key={`${todo.id}-todo-item`}>{todo.text}</div>
          ))}
        </div>
      );
    }
  }
}

// this passes the component the todos based on the query
export default graphql(TodosQuery)(App);
