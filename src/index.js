import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import YTSearch from 'youtube-api-search';
import reducers from './reducers';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import BookList from './containers/book_list';
import BookDetail from './containers/book_detail';

const API_KEY = '<your-api-key>';
const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('Avengers');
    };

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            }); // ES6 - videos: videos
        });
    };

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
                <BookList />
                <BookDetail />
            </div>
        );
    };
};

// use REACTDOM for DOM rendering
// param1: REACT element to be rendered in DOM
// param2: target container
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>, 
    document.querySelector('.container'));