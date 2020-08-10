import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../API/TMBApi';


class FilmItem extends React.Component {

    _tryFormateDate(date) {
        const rex = /-/gi;
        let newDate = '';

        try {
            newDate = date.replace(rex, '/');
        } catch (error) {
            // pass
        }
        return newDate;
    }

    _movieIsFavorite() {
        if (this.props.isFavoriteMovie) {
            let imageFile = require('../ic_favorite.png');
            return (
                <Image
                    style={styles.favoriteImage}
                    source={imageFile}
                />
            );
        }

    }

    render() {
        const movie = this.props.movie;
        const displayMovieDetail = this.props.displayMovieDetail;

        return (
            <TouchableOpacity
                style={styles.mainItem}
                onPress={() => displayMovieDetail(movie.id)}>
                <Image style={styles.moviePicture} source={{uri: getImageFromApi(movie.poster_path)}}/>
                <View style={styles.movieData}>
                    <View style={styles.movieHead}>
                        <Text style={styles.movieTitle}>{this._movieIsFavorite()}{movie.title}</Text>
                        <Text style={styles.movieVote}>{movie.vote_average}</Text>
                    </View>
                    <View style={styles.movieDescribe}>
                        <Text numberOfLines={6}>{movie.overview}</Text>
                    </View>
                    <View style={styles.moviePublished}>
                        <Text>Sortie le  {this._tryFormateDate(movie.release_date)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    mainItem: {
        flexDirection: 'row',
        height: 190, // juste pour voir la box avec une couleur
        marginBottom: 5,
        padding: 2,
    },
    moviePicture: {
        width: 100, // juste pour voir la box avec une couleur
        // backgroundColor: 'grey',
        marginRight: 10,
    },
    movieData: {
        flex: 1,
        justifyContent: 'space-between',
    },
    movieHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    movieTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
    },
    movieVote: {
        fontSize: 30,
        color: '#666666',
        marginRight: 5,
    },
    movieDescribe: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    moviePublished: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    favoriteImage: {
        width: 20,
        height: 20,
    },
});

export default FilmItem;