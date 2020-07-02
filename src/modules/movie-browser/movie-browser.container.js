import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {AppBar, TextField, RaisedButton} from 'material-ui';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';
import URL from './movie-browser.service';
const axios = require('axios');
 
class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      currentMovies: [],
      allMovies: []
    };
  // this.componentDidMount()
    this.handleScroll = this.handleScroll.bind(this);
    
  //  this.performSearch()
  }

  componentDidMount() {
    axios.get(URL).then(res => {
      console.log(res.data.results);
      // this.state.currentMovies = res.data.results;
      this.setState({currentMovies: res.data.results.slice(0,8)})
      this.setState({allMovies: res.data.results})
    })
    // window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
    
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const {topMovies} = this.props;
    if (!topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.setState({currentPage: nextPage});
      }
    }
  }
  performSearch(event)  {
    const searchTerm = event.target.value;
    const boundObj = this;
    boundObj.props.getSearchUrl(searchTerm);
    console.log('using movie fb', searchTerm)
  } 

  render() {
    const {topMovies} = this.props;
    console.log(topMovies.response, 'top movies')
    console.log(this.state.currentMovies)
    // const movies = movieHelpers.getMoviesList(topMovies.response);
    // const movies = this.state.currentMovies;
    const movies = movieHelpers.getMoviesList(this.state.currentMovies);
    return (
      <div>
        <AppBar title='Movie Browser' />
        <Grid>
          <Row>
            {/* <p>Search will go here</p> */}
            <input placeholder="Enter movie name"
              onChange={this.performSearch.bind(this)}
              className="form-control search-input" />

          </Row>
          <Row>
            <MovieList movies={movies} />
          </Row>
        </Grid>
        <MovieModal />
      </div>
    );
  }
}

export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    topMovies: state.movieBrowser.topMovies
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);
