import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { fonts } from "./src/lib/data";
import * as SplashScreen from "expo-splash-screen";

const App = () => {
    const [fontsLoaded, fontError] = useFonts(fonts);

    const onLayoutRootView = async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    };

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    } else if (fontError) {
        return <Text>error Loading fonts...</Text>;
    } else {
        return (
            <NavigationContainer onLayout={onLayoutRootView}>
                <DrawerNavigator />
            </NavigationContainer>
        );
    }
};

export default App;
