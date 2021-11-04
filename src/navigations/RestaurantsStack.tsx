import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../screens/Restaurants/Restaurants.screen';
import AddRestaurant from '../screens/Restaurants/AddRestaurant/AddRestaurant.screen';

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator initialRouteName="restaurants">
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: 'Restaurantes' }}
      />
      <Stack.Screen
        name="addRestaurant"
        component={AddRestaurant}
        options={{ title: 'Agregar Restaurante' }}
      />
    </Stack.Navigator>
  );
}
