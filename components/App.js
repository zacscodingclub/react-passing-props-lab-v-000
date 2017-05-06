import React, { Component } from 'react';

import FruitBasket from './FruitBasket';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fruit: [],
      filters: [],
      selectedFilter: null
    }

    this.updateFruitList = this.updateFruitList.bind(this);
    this.fetchFilters = this.fetchFilters.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillMount() {
    this.updateFruitList();
    this.fetchFilters();
  }

  fetchFilters() {
    fetch('/api/fruit_types')
      .then(res => res.json())
      .then(filters => this.setState({filters: filters}));
  }

  updateFruitList() {
    fetch('/api/fruit')
      .then(res => res.json())
      .then(fruit => this.setState({ items: fruit}));
  }

  handleFilterChange(e) {
    console.log('new filter: ', e.target.value);
    this.setState({ selectedFilter: e.target.value });
  }

  render() {
    return (
      <FruitBasket
          fruitsList={this.state.fruit}
          filters={this.state.filters}
          selectedFilter={this.state.selectedFilter}
          onFilterChange={this.handleFilterChange}
      />
    )
  }
}

export default App;
