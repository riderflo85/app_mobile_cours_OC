import React from 'react';
import { StyleSheet, View } from 'react-native';


class Test extends React.Component {
    render() {
        return(
            <View style={style.main_container}>
                <View>

                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default Test;