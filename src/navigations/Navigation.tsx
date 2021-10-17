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
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="restaurantsNav"
          component={RestaurantsStack}
          options={{ title: 'Restaurantes' }}
        />
        <Tab.Screen
          name="favoritesNav"
          component={FavoritesStack}
          options={{ title: 'Favoritos' }}
        />
        <Tab.Screen
          name="topRestaurantsNav"
          component={TopRestaurantsStack}
          options={{ title: 'Top 5' }}
        />
        <Tab.Screen
          name="searchNav"
          component={SearchStack}
          options={{ title: 'Buscador' }}
        />
        <Tab.Screen
          name="accountNav"
          component={AccountStack}
          options={{ title: 'Mi Cuenta' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route: any, color: any) {
  switch (route.name) {
    case 'restaurantsNav':
      iconName = 'compass-outline';
      break;
    case 'favoritesNav':
      iconName = 'heart-outline';
      break;
    case 'topRestaurantsNav':
      iconName = 'star-outline';
      break;
    case 'searchNav':
      iconName = 'magnify';
      break;
    case 'accountNav':
      iconName = 'home-outline';
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
