const KEY = '40854865-379b4e91125b45648445462a5';
const BASE_URL = 'https://pixabay.com/api/';

export const getImages = (searchText) => {
    const params = new URLSearchParams({
        'key': KEY,
        'q': searchText,
        'page': 1,
        'image_type': 'photo', // 'photo' is a string, so it should be in quotes
        'orientation': 'horizontal', // Same here, it should be in quotes
        'per_page': 12,
    });
    return fetch(`${BASE_URL}?${params.toString()}`)
}


