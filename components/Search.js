import React from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FilmsList from './FilmsList';
import { getMovieWithText } from '../API/TMBApi';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoading: false,
        };
        this.searchedText = '';
        this.page = 0;
        this.totalPages = 0;
        this._loadMovies = this._loadMovies.bind(this); // Function.prototype.bind() pour lier la méthode de classe à l'instance
        // this._searchedUserText = this._searchedUserText.bind(this);
        // this._displayLoading = this._displayLoading.bind(this);
        this._displayNewMovies = this._displayNewMovies.bind(this);
        this._searchedMovie = this._searchedMovie.bind(this);

    }

    _searchedUserText(text) {
        this.searchedText = text;
    }

    _loadMovies() {
        if (this.searchedText.length > 0) {
            this.setState({isLoading: true}); // lancement du chargement
            getMovieWithText(this.searchedText, this.page+1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    movies: this.state.movies.concat(data.results),
                    isLoading: false, // arret du chargement
                });
                
            });
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
            );
        }
    }

    _displayNewMovies() {
        if (this.page < this.totalPages) {
            this._loadMovies();
        }
    }

    _searchedMovie() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({movies: []}, () => {
            this._loadMovies();
        });
    }

    _displayMovieDetail = (idMovie) => {
        this.props.navigation.navigate('Movie detail', {idMovie: idMovie})
    }

    _movieIsFavorite(idMovie) {
        let isFavorite = false;

        if (this.props.favoriteMovie.findIndex(item => item.id === idMovie) !== -1) {
            // le film est un film favoris
            isFavorite = true;
        }

        return isFavorite;
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                    placeholder='Titre du film recherché'
                    onChangeText={(text) => this._searchedUserText(text)}
                    onSubmitEditing={() => this._searchedMovie()}

                />
                <View style={styles.btnSearch}>
                    <Button title='Rechercher un film avec button natif' onPress={this._searchedMovie}/>
                </View>
                <FilmsList
                    movies={this.state.movies}
                    navigation={this.props.navigation}
                    loadNextMovies={this._displayNewMovies}
                    page={this.page}
                    totalPages={this.totalPages}
                    isFavoriteList={false}
                />
                {/* <FlatList
                    data={this.state.movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem movie={item} displayMovieDetail={this._displayMovieDetail} isFavoriteMovie={this._movieIsFavorite(item.id)}/>}
                    extraData={this.props.favoriteMovie}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._displayNewMovies}
                /> */}
                {this._displayLoading()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 20,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: '#0099ff',
        borderRadius: 10,
    },
    btnSearch: {
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    }
});

const mapStateToProps = (state) => {
    return {
        favoriteMovie: state.favoriteMovie
    };
};

export default connect(mapStateToProps)(Search);