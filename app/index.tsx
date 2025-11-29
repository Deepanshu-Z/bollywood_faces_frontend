import { Text, View } from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import '../global.css';
export default function Page() {
  return (
    <SafeAreaView>
      <View className=" bg-red-500 ">
        <Text>Hello World</Text>
        <Text>This is the first page of your app.</Text>
      </View>
    </SafeAreaView>
  );
}
