import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ keyProp, tags, webformatURL, largeImageURL}) => {
    return (
        <> 
        <li className={css.ImageGalleryItem} id={keyProp}>
            <img className={css.ImageGalleryItemImage} src={webformatURL} alt={`${tags} `}/>
            <p>{tags}</p>
        </li>
        </>
    )
}

export default ImageGalleryItem;