import {Component} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "./Searchbar";
// import {imageError, searchImage} from './api/images';
import ImageGallery from "./ImageGallery";

// import Loader from "./Loader";
// import Modal from "./Modal";

class App extends Component {
  state = {
      searchText: '',
  }

  handleSearchbar = searchText => {
    this.setState({searchText});
  }
  
  render () {
    const {handleSearchbar} = this;
    return (
      <div>
        <Searchbar onSubmit={handleSearchbar}/>
        <ImageGallery searchText={this.state.searchText}/>
        <ToastContainer autoClose={3000}/>
        {/* <Loader /> */}
      </div>
    )
  }
}

export default App;