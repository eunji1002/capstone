
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {MainStackNavigator,MainStackNavigator2} from "./StackNavigator";
import TabNavi from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="drawer1" component={TabNavi} />
      <Drawer.Screen name="drawer2" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;