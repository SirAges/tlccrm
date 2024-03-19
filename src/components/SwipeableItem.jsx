import React, { useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const SwipeableItem = ({ children, onSwipeLeft, onSwipeRight }) => {
    const translationX = useRef(new Animated.Value(0)).current;

    const handleGestureEvent = Animated.event(
        [{ nativeEvent: { translationX } }],
        { useNativeDriver: true }
    );

    const handleGestureStateChange = event => {
        if (event.nativeEvent.state === State.END) {
            const swipeThreshold = 30; // Adjust as needed
            if (event.nativeEvent.translationX > swipeThreshold) {
                onSwipeRight();
            } else if (event.nativeEvent.translationX < -swipeThreshold) {
                onSwipeLeft();
            }
            Animated.spring(translationX, {
                toValue: 0,
                useNativeDriver: true
            }).start();
        }
    };

    return (
        <PanGestureHandler
            onGestureEvent={handleGestureEvent}
            onHandlerStateChange={handleGestureStateChange}
            failOffsetY={[-10, 10]} // Allow vertical gestures for scrolling
            activeOffsetX={[-20, 20]} // Adjust as needed for sensitivity
        >
            <Animated.View
                style={{
                    transform: [{ translateX: translationX }]
                }}
            >
                {children}
            </Animated.View>
        </PanGestureHandler>
    );
};
export default SwipeableItem;
