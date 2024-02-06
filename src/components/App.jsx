import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar/Searchbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    images: [],
    status: 'idle',
    searchText: '',
    page: 1,
    showModal: false,
    selectedImage: null,
    isLastPage: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.setState({ images: [], page: 1, isLastPage: false, status: 'pending' }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = () => {
    const { searchText, page } = this.state;
    const API_KEY = '40854865-379b4e91125b45648445462a5';

    axios
      .get(
        `https://pixabay.com/api/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          this.setState({ status: 'resolved', isLastPage: true });
          return toast('Sorry, there are no images matching your request...', {
            position: toast.POSITION.TOP_CENTER,
            icon: '🤔',
          });
        }

        const modifiedHits = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        }));

        this.setState(prevState => ({
          images: [...prevState.images, ...modifiedHits],
          page: prevState.page + 1,
          isLastPage: prevState.images.length + modifiedHits.length >= totalHits,
          status: 'resolved',
        }));
      })
      .catch(error => {
        this.setState({ status: 'rejected', error: error.message });
      })
  };

  handleSearchSubmit = searchText => {
    if (this.state.searchText === searchText) {
      return;
    }
    this.setState({ searchText, page: 1, images: [], error: null, isLastPage: false, status: 'pending' });
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { images, status, error, showModal, selectedImage, isLastPage } = this.state;

    if (status === 'idle') {
      return (
        <>
          <ToastContainer transition={Flip} />
          <Searchbar onSubmit={this.handleSearchSubmit} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <ToastContainer transition={Flip} />
          <Searchbar onSubmit={this.handleSearchSubmit} />
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <ToastContainer transition={Flip} />
          <Searchbar onSubmit={this.handleSearchSubmit} />
          {error && <p>Error: {error}</p>}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ToastContainer transition={Flip} />
          <Searchbar onSubmit={this.handleSearchSubmit} />
          {error && <p>Error: {error}</p>}
          <ImageGallery images={images} onItemClick={this.handleImageClick} />
          {!isLastPage && <Button onClick={this.fetchImages} />}
          {showModal && <Modal image={selectedImage} onClose={this.handleModalClose} />}
        </>
      );
    }
  }
}

export default App;
