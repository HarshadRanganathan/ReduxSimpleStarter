export function selectBook(book) {
    // action creator to return an action, an object with type property
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}