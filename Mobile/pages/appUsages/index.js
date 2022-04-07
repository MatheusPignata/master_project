import React from "react";
import Registro from '../registro/index.js';
import UserPage from "../userpage/index.js";
import Usuarios from '../usuarios/index.js';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function AppUsages({navigation, route}){
    let pages = [
        <Tab.Screen name="Registro"  component={Registro} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-multiple-plus" color={color} size={26} />),}}></Tab.Screen>, 
        <Tab.Screen name="Usuarios" component={Usuarios} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-cog" color={color} size={26} />),}}></Tab.Screen>
    ]
    return(
        <Tab.Navigator barStyle={{ backgroundColor: '#FFF' }} activeColor="#F00" >
            <Tab.Screen name="Usuario" component={UserPage} initialParams={route.params} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={26} />), headerShown:false}}></Tab.Screen>
            {
                (route.params.cargo == "Diretor de Unidade de Formação Profissional")? pages.map(e=>{return(e)}) : null
            }
        </Tab.Navigator> 
    );
}