import { Button, Text, View } from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import '../global.css';
import { router } from 'expo-router';
export default function Page() {
  return (
    <SafeAreaView>
      <View className=" bg-red-500 ">
        <Text>Hello World</Text>
        <Text>This is the first page of your app.</Text>
        <Button title="Go to Signup" onPress={() => router.push('/auth/signup')} />
        <Button title="Go to Login" onPress={() => router.push('/auth/login')} />
      </View>
    </SafeAreaView>
  );
}
