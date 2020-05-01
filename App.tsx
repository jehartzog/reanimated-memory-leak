import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import LeakyComponent from './LeakyComponent';

export default function App() {

  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={{ flex: 1}}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <Text>Press me to toggle visible component, and leak</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {isVisible && <LeakyComponent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
