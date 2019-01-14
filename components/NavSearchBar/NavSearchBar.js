import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

class NavSearchBar extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.goSearch = this.goSearch.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.state = {
      search: props.search,
    }
  }

  goSearch() {
    const search = this.state.search.trim();
    if (search.length > 0) {
      this.props.navigation.push('SearchDeckList', {
        search,
      });
    }
  }

  onChangeText(search) {
    this.setState({
      search,
    });
  }

  onClear() {
    this.setState({
      search: '',
    });
  }

  render() {
    return (
      <SearchBar
        containerStyle={{width: '100%', backgroundColor: 'transparent'}}
        searchIcon={true}
        onChangeText={this.onChangeText}
        onClear={this.onClear}
        placeholder='What are you learning?'
        onEndEditing={this.goSearch}
        returnKeyType={'search'}
        value={this.state.search}
        />
    )
  }
}

NavSearchBar.navigationOptions = (props) => {

  return {
    headerStyle: {
      backgroundColor: '#000D11',
    },
    headerTitleStyle: {
      color: '#F5F5F5',
    },
    headerBackTitle: '',
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
  };
};


NavSearchBar.defaultProps = {
  search: '',
};

export default NavSearchBar;
