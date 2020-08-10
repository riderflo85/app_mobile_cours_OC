import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FilmsList from './FilmsList';


class Favorites extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Mes favoris</Text>
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
});

export default Favorites;