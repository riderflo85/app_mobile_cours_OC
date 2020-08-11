import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FilmsList from './FilmsList';
import { connect } from 'react-redux';


class Favorites extends React.Component {

    render() {
        return (
            <FilmsList
                movies={this.props.favoriteMovie}
                navigation={this.props.navigation}
                isFavoriteList={true}
            />
        );
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     marginTop: 10,
    //     paddingHorizontal: 10,
    // },
});

const mapStateToProps = state => {
    return {
        favoriteMovie: state.favoriteMovie
    };
}

export default connect(mapStateToProps)(Favorites);