import React, { Component } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import loDebounce from 'lodash/debounce'
import MuseumsActions from '../../redux/museumsRedux'
import { Metrics } from '../../themes'

const LIMIT = 10

class Museums extends Component {

  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.searchMuseums = loDebounce(this.searchMuseums.bind(this), 300)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.props.museumsRequest(0, LIMIT)
  }

  searchMuseums(text) {
    this.props.museumsRequest(0, LIMIT, text)
  }

  renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={styles.thumbImage}
          source={{ uri: item.thumb }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item.name}</Text>
        </View>
      </View>
    )
  }

  renderFooter() {
    return this.props.isLoadingMore ?
      <ActivityIndicator size='small' style={{ height: 70 }} /> :
      null
  }


  handleLoadMore() {
    const { isRequesting, isLoadingMore, hasMore, museumsRequest, museums } = this.props;
    const { text } = this.state
    if (isRequesting || isLoadingMore || !hasMore) return

    museumsRequest(museums.length, LIMIT, text);
  }

  render() {
    const { museums, isRequesting } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <TextInput
            style={styles.searchTxt}
            placeholder="Search..."
            onChangeText={(text) => {
              this.setState({ text })
              this.searchMuseums(text)
            }}
          />

          {isRequesting ? (
            <ActivityIndicator />
          ) : (
              <FaIcon name="search" size={20} />
            )}
        </View>
        <FlatList
          style={styles.container}
          // contentContainerStyle={{ paddingVertical: 20 }}
          data={museums}
          keyExtractor={(item) => item._id}
          renderItem={this.renderItem.bind(this)}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  museums: state.museums.museums,
  isRequesting: state.museums.isRequesting,
  isLoadingMore: state.museums.isLoadingMore,
  hasMore: state.museums.hasMore,
})

const mapDispatchToProps = (dispatch) => ({
  museumsRequest: (skip, limit, text) => dispatch(MuseumsActions.museumsRequest(skip, limit, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Museums)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTxt: {
    // paddingVertical: 5, 
    // paddingHorizontal: 10, 
    flex: 1,
    marginRight: 10
  },
  itemContainer: {
    marginBottom: Metrics.screenPadding
  },
  thumbImage: {
    width: Metrics.screenWidth,
    height: 200,
    resizeMode: 'cover',
  },
  nameTxt: {
    fontSize: Metrics.headerFontSize,
    fontWeight: 'bold'
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
})