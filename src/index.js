import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';



const API_KEY = 'AIzaSyCsYeYj0ZXe_U5bOJouC4hfW9RBnmAqQP8';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key:API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			}); // this.setState({ videos:videos});
		});		
	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					//console.log(this.state.selectedVideo)
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
				<li onClick={()=>console.log(this.state.selectedVideo)}>click me</li>
			</div>
		);
	}
}


ReactDOM.render(<App/>, document.querySelector('.container'));