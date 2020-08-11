import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import FilmItem from './FilmsItem';
import { connect } from 'react-redux';


class FilmsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

    _displayDetailForMovie = (idMovie) => {
        // On a récupérer les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('Movie detail', { idMovie: idMovie });
    }

    render() {
        return (
            <FlatList
                style={styles.listing}
                data={this.props.movies}
                extraData={this.props.favoriteMovie}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <FilmItem
                        movie={item}
                        displayMovieDetail={this._displayDetailForMovie}
                        // Version ES6
                        isFavoriteMovie={(this.props.favoriteMovie.findIndex(movie => movie.id === item.id) !== -1) ? true : false}
                        // Version ES2015
                        // isFavoriteMovie={(item) => {
                        //     let indexFavoriteMovie = this.props.favoriteMovie.findIndex((movie) => movie.id === item.id);
                        //     if (indexFavoriteMovie !== -1) {
                        //         return true;
                        //     } else {
                        //         return false;
                        //     }
                        // }}
                    />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.isFavoriteList && this.props.page < this.props.totalPages) {
                        // On appel la méthode loadMovie du component Search pour charger plus de films
                        this.props.loadNextMovies();
                    }
                }}
            />
        );
    }
}

const styles = StyleSheet.create([
    listing = {
        flex: 1,
    },
]);

const mapStateToProps = state => {
    return {
        favoriteMovie: state.favoriteMovie
    };
}

export default connect(mapStateToProps)(FilmsList);