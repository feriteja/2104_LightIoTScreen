import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  interpolateColors,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const App = () => {
  const y = useSharedValue(-50);
  const stateLight = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      // console.log(event.translationY);
      y.value = ctx.startY + event.translationY;
    },
    onFinish: e => {
      if (stateLight.value == 0) {
        if (e.translationY > 100) {
          y.value = withSpring(60);
          stateLight.value = withSpring(1);
          return;
        }
        y.value = withSpring(-50);
        return;
      }
      if (stateLight.value == 1) {
        if (e.translationY > 30) {
          y.value = withSpring(-50);
          stateLight.value = withSpring(0);
          return;
        }
        y.value = withSpring(60);
        return;
      }
    },
  });

  const animatedStyleSwitch = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  });

  const animatedBackground = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      stateLight.value,
      [0, 1],
      ['#21202A', '#F2D71B'],
    );

    return {
      backgroundColor,
    };
  });

  const animatedFontColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      stateLight.value,
      [0, 1],
      ['#fafafa', '#222'],
    );
    return {
      color,
    };
  });
  const animatedFontColor2 = useAnimatedStyle(() => {
    const color = interpolateColor(
      stateLight.value,
      [0, 1],
      ['#fafafa', '#222'],
    );
    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedBackground]}>
      <View style={{top: -150}}>
        <Animated.Text
          style={[{fontSize: 35, fontWeight: 'bold'}, animatedFontColor]}>
          My Room1
        </Animated.Text>
        <Animated.Text
          style={[{fontSize: 20, fontWeight: 'bold'}, animatedFontColor2]}>
          24°C
        </Animated.Text>
      </View>
      <View style={styles.switchContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[{alignItems: 'center'}, animatedStyleSwitch]}>
            <View
              style={{
                height: height,
                transform: [{translateY: -height}],
                position: 'absolute',
                width: 2,
                backgroundColor: 'white',
              }}
            />
            <View
              style={[
                {
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: 'yellow',
                },
              ]}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    // alignItems: 'center',
    backgroundColor: '#aaa',
  },
  switchContainer: {
    position: 'absolute',
    right: 20,
    height: 200,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
});
