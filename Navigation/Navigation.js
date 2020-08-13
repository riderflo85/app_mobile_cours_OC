import React from 'react';
import Search from '../components/Search';
import DetailMovie from '../components/FilmsDetail'
import Favorites from '../components/Favorites';
import Test from '../components/Test';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Search movie"
                component={Search}
                options={{title: 'Rechercher un film'}}
            />
            <HomeStack.Screen
                name="Movie detail"
                component={DetailMovie}
                options={{title: 'Détail du film'}}
            />
        </HomeStack.Navigator>
    );
}


const FavoriteMovieStack = createStackNavigator();

function FavoriteMovieStackScreen() {
    return (
        <FavoriteMovieStack.Navigator>
            <FavoriteMovieStack.Screen
                name="My favorite movie"
                component={Favorites}
                options={{title: "Mes Films Favoris"}}
            />
            <FavoriteMovieStack.Screen
                name="Movie detail"
                component={DetailMovie}
                options={{title: "Détail du film"}}
            />
        </FavoriteMovieStack.Navigator>
    );
}


const MyTab = createBottomTabNavigator();

class MyNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <MyTab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Test') {
                                iconName = focused ? 'test-tube-alt' : 'test-tube';

                                return <Fontisto name={iconName} size={size} color={color}/>;

                            } else if (route.name === 'Search movie') {
                                // ES6 version
                                iconName = focused ? 'md-search' : 'ios-search';

                            } else if (route.name === 'Favorites movies') {
                                // ES 2015
                                if (focused) {
                                    iconName = 'ios-heart';
                                } else {
                                    iconName = 'ios-heart-empty';
                                }

                            }

                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'rgb(74, 141, 245)',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <MyTab.Screen
                        name="Test"
                        component={Test}
                        options={{title: 'Test divers'}}
                    />
                    <MyTab.Screen
                        name="Search movie"
                        component={HomeStackScreen}
                        options={{ title: 'Accueil' }}
                    />
                    <MyTab.Screen
                        name="Favorites movies"
                        component={FavoriteMovieStackScreen}
                        options={{ title: 'Mes Favoris' }}
                    />
                </MyTab.Navigator>
            </NavigationContainer>
        );
    }
}

export default MyNavigation;