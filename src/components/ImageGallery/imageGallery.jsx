import React, {Component} from 'react';
import { getImages } from 'components/api/images';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem'; 
import Button from "./Button";

class ImageGallery extends Component {
    state = {
        images: null,
        status: 'idle'
    }

    componentDidUpdate(prevProps, _) {
        console.log(this.props);
        if(prevProps.searchText !== this.props.searchText) {
            this.setState({status: 'pending'})

            getImages(this.props.searchText)
            // .then((response) => response.json())
            // .then((data) => this.setState({images: data.hits}))

            .then(response => {
                if (!response.ok) {
                    this.setState({status: 'rejected'})
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => this.setState({status: 'resolved', images: data.hits}))
            .catch(error => {
                // Обробка помилок
                this.setState({status: 'rejected'})
                toast.error('😥 Error fetching data! Please try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
            });;
        }        
    }

    render() {
        const {images, status} = this.state;

        if (status === 'idle') {
                return "Enter your search request"
            }

        if (status === 'pending'){
            return <>
                <p>Loading...</p>
            </>
        }

        if (status === 'rejected'){
            return (
                toast.error('😥 Error fetching data! Please try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
            )
        
        }

        if (status === 'resolved') {
            return (
                <div>
                    <p>Ахуєнно</p>
                    <ul className={css.gallery}>
                    {images.map(image => (
                            <ImageGalleryItem
                                keyProp={image.id}
                                tags={image.tags}
                                webformatURL={image.webformatURL}
                                largeImageURL={image.largeImageURL}
                            />
                        ))}
                        <Button /> 
                    </ul>
                </div>
            );
        }
}

static propTypes = {
    searchText: PropTypes.string.isRequired,
};

}

export default ImageGallery;



