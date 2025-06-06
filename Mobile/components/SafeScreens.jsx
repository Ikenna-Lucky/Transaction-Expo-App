import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import React from 'react';
const SafeScreens = ({children}) => {
    const insets = useSafeAreaInsets();
    return (
        <View
          style={{
            paddingTop: insets.top,
            paddingLeft:insets.left,
            paddingRight:insets.right,
            paddingBottom: insets.bottom,
            backgroundColor: COLORS.background,
            flex: 1,
          }}
        >
          {children}
        </View>
      );
}

export default SafeScreens




