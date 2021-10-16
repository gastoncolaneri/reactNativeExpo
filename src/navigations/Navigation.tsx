import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import RestaurantsStack from './RestaurantsStack';
import FavoritesStack from './FavoritesStack';
import AccountStack from './AccountStack';
import TopRestaurantsStack from './TopRestaurantsStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();
let iconName: string;

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarInactiveTintColor: '#646464',
          tabBarActiveTintColor: '#00a680',
        })}
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ title: 'Restaurantes' }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: 'Favoritos' }}
        />
        <Tab.Screen
          name="topRestaurants"
          component={TopRestaurantsStack}
          options={{ title: 'Top 5' }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: 'Buscador' }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: 'Mi Cuenta' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route: any, color: any) {
  switch (route.name) {
    case 'restaurants':
      iconName = 'compass-outline';
      break;
    case 'favorites':
      iconName = 'heart-outline';
      break;
    case 'topRestaurants':
      iconName = 'star-outline';
      break;
    case 'search':
      iconName = 'magnify';
      break;
    case 'account':
      iconName = 'home-outline';
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
