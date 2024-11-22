import { Text, View } from 'react-native';

const OAuth = () => {
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-center gap-3">
        <View className="h-hairline flex-1 bg-general-100" />
        <Text className="text-lg">OR</Text>
        <View className="h-hairline flex-1 bg-general-100" />
      </View>
    </View>
  );
};

export default OAuth;
