import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Share, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getMovieDetailFromApi, getImageFromApi } from '../API/TMBApi';


class DetailMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
            isLoading: false, // pour afficher le chargement par défaut, le temps d'avoir la réponse de la requette à l'API
        }
        this.idMovie = this.props.route.params.idMovie;
        this._shareMovie = this._shareMovie.bind(this);
    }

    navigationOptions = ({navigation}) => {
        const params = navigation.route.params;

        if (params.movie !== undefined && Platform.OS === 'ios') {
            navigation.setOptions({
                headerRight: () => {
                    <TouchableOpacity
                        style={style.sharedIOSButton}
                        onPress={() => params.shareMovie()}>
                        <Image
                            style={style.sharedButtonImage}
                            source={require('../ic_share.png')}/>
                    </TouchableOpacity>
                }
            });
        }
    }

    componentDidMount() {
        // Fait parti des méthodes de classe du cycle de vie d'un component
        const indexFavoriteMovie = this.props.favoriteMovie.findIndex(item => item.id === this.idMovie);
        if (indexFavoriteMovie !== -1) {
            this.setState({
                movie: this.props.favoriteMovie[indexFavoriteMovie],
            }, () => { this._updateNavigationParams() });
            return;
        }

        this.setState({
            isLoading: true
        });

        getMovieDetailFromApi(this.idMovie)
        .then(data => {
            this.setState({
                movie: data,
                isLoading: false
            }, () => { this._updateNavigationParams() });
        });
    }

    componentDidUpdate() {
        // Fait parti des méthodes de classe du cycle de vie d'un component
        // console.log('Update component');
        // console.log(this.props.favoriteMovie);
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={style.loading}>
                    <ActivityIndicator size='large'/>
                </View>
            );
        }
    }

    _toggleFavorite() {
        // Ajoute ou supprime le film des favoris
        const action = {type: 'TOGGLE_FAVORITE', value: this.state.movie};
        this.props.dispatch(action);
    }

    _displayFavoriteImage() {
        let imageFile = require('../ic_favorite_border.png');
        if (this.props.favoriteMovie.findIndex(item => item.id === this.state.movie.id) !== -1) {
            // le film est dans les favoris
            // on change l'image du bouton
            imageFile = require('../ic_favorite.png');
        }

        return (
            <Image style={style.imageFavorite} source={imageFile}/>
        );
    }

    _displayMovieDetail() {
        if (this.state.movie != undefined) {
            const mData = this.state.movie;
            // mData.release_date
            return (
                <ScrollView style={style.detailMovie}>
                    <Image style={style.image} source={{uri: getImageFromApi(mData.backdrop_path)}}/>
                    <Text style={style.titleMovie}>{mData.title}</Text>
                    <TouchableOpacity style={style.toggleFavorite} onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={style.bodyMovie}>{mData.overview}</Text>
                    <View style={style.detailMovie}>
                        <Text>Sortie le {mData.release_date.split('-').reverse().join('/')}</Text>
                        <Text>Note: {mData.vote_average}/10</Text>
                        <Text>Nombre de votes: {mData.vote_count} </Text>
                        <Text>Budget: {mData.budget} $</Text>
                        <Text>Genre(s): {mData.genres.map(function(genre) {
                            return genre.name
                        }).join(' / ')}</Text>
                        <Text>Companie(s): {mData.production_companies.map(function (companie) {
                            return companie.name
                        }).join(' / ')}</Text>
                    </View>
                </ScrollView>
            );
        }
    }

    _shareMovie() {
        const movieShared = this.state.movie;
        Share.share({title: movieShared.title, message: movieShared.overview});
    }

    _displayFloatingActionButton() {
        const movie = this.state.movie;

        if (movie !== undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={style.sharedAndroidButton}
                    onPress={() => this._shareMovie()}>
                    <Image
                        style={style.sharedButtonImage}
                        source={require('../ic_share.png')}/>
                </TouchableOpacity>
            );
        }
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareMovie: this._shareMovie,
            movie: this.state.movie
        });
    }

    render() {
        console.log(this.props);

        return (
            <View style={style.main_container}>
                {this._displayLoading()}
                {this._displayMovieDetail()}
                {this._displayFloatingActionButton()}
            </View>
        );
    }
}

const style = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailMovie: {
        flex: 1,
        padding: 5
    },
    image: {
        height: 170,
    },
    titleMovie: {
        fontWeight: 'bold',
        fontSize: 27,
        textAlign: 'center',
    },
    bodyMovie: {
        flexWrap: 'wrap',
        fontStyle: 'italic', 
        color: '#666666',
        marginHorizontal: 5,
        marginVertical: 20,
    },
    infoMovie: {
        marginVertical: 10,
    },
    toggleFavorite: {
        alignItems: 'center',
    },
    imageFavorite: {
        width: 40,
        height: 40,
    },
    sharedAndroidButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sharedButtonImage: {
        width: 30,
        height: 30,
    },
    sharedIOSButton: {
        marginRight: 8,
    }
});

const mapStateToProps = (state) => {
    return {
        favoriteMovie: state.favoriteMovie
    };
};

export default connect(mapStateToProps)(DetailMovie);