import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {PanGestureHandler, TapGestureHandler, State} from 'react-native-gesture-handler';


const {
  and,
  block,
  clockRunning,
  set,
  Clock,
  cond,
  eq,
  // debug,
  Extrapolate,
  max,
  lessThan,
  greaterOrEq,
  event,
  Value,
  startClock,
  timing,
  call,
  stopClock,
} = Animated;

class FancyAnimation extends React.Component {
  activeOneOpacity = new Value(1);
  activeTwoOpacity = new Value(0);
  activeThreeOpacity = new Value(0);

  buttonX = new Value(0);
  buttonSnapClock = new Clock();

  greenButtonOpacity = new Value(1);
  navyButtonOpacity = new Value(0);

  isTouchEnabled = new Value(1);

  sparksValue = new Value(0);

  handleTap = event([
    {
      nativeEvent: ({translationX, state}: any) =>
      cond(
        eq(state, State.END),
        call([], () => console.log('tapped')),
      ),
    },
  ]);

  handlePan = event([
    {
      nativeEvent: ({translationX, state}: any) =>
        block([
          cond(
            eq(state, State.BEGAN),
            call([], () => console.log('drag started, memory leaked'))
          ),
          set(this.buttonX, translationX),
        ]),
    },
  ]);

  render() {
    const buttonViewStyle = {transform: [{translateX: this.buttonX}]};

    return (
      <View>
        <TapGestureHandler onHandlerStateChange={this.handleTap}>
          {/* must have this extra View https://github.com/software-mansion/react-native-gesture-handler/issues/71#issuecomment-351361705 */}
          <Animated.View>
            <PanGestureHandler onGestureEvent={this.handlePan} onHandlerStateChange={this.handlePan}>
              <Animated.View style={buttonViewStyle}>
                <Text>I Move</Text>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      </View>
    );
  }
}

export default FancyAnimation;
