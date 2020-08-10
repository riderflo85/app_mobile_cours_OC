const initialState = {
    favoriteMovie: [],
};

function toggleFavorite(state=initialState, action) {
    let nexState;

    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteMovieIndex = state.favoriteMovie.findIndex(el => el.id === action.value.id);

            if (favoriteMovieIndex !== -1) {
                // le film est déjà dans la liste, donc on le supprime
                nexState = {
                    ...state,
                    favoriteMovie: state.favoriteMovie.filter((el, index) => index !== favoriteMovieIndex)
                };
            } else {
                // le film n'est pas dans la liste, donc on l'ajoute
                nexState = {
                    ...state,
                    favoriteMovie: [...state.favoriteMovie, action.value]
                };
            }
            return nexState || state; // renvoi nextState si celui-ci est différent de undefined
        default:
            return state;
    }
}

export default toggleFavorite;