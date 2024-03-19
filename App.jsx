import 'react-native-gesture-handler'
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import { useFonts } from "expo-font";
import { fonts } from "./src/lib/data";
// import * as SplashScreen from "expo-splash-screen";
import SplashScreen from "./src/screens/SplashScreen";
import { DataProvider } from "./src/hooks/GlobalContext";

// SplashScreen.preventAutoHideAsync();
const App = () => {
    // SplashScreen.hideAsync();
    const [fontsLoaded, fontError] = useFonts(fonts);
    useEffect(() => {
        const loadFonts = async () => {
    

            if (!fontsLoaded && !fontError) {
                return <SplashScreen />;
            }
        };
        loadFonts();
    }, [fontError, fontsLoaded]);

    return (
        <Provider store={store}>
            <DataProvider>
                <NavigationContainer>
                    <Home />
                </NavigationContainer>
            </DataProvider>
        </Provider>
    );
};

export default App;
