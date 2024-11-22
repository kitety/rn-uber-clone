import { Image, Text, View } from 'react-native';
import { icons } from '~/constants';
import CustomButton from './customButton';

const OAuth = () => {
  const handleGoogleSignIn = async () => {
    console.log('google');
  };
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-center gap-3">
        <View className="h-hairline flex-1 bg-general-100" />
        <Text className="text-lg">OR</Text>
        <View className="h-hairline flex-1 bg-general-100" />
      </View>
      <CustomButton
        bgVariant="outline"
        className="mt-5 w-full shadow-none"
        textVariant="primary"
        title="Continue with Google"
        IconLeft={() => (
          <Image className="mx-2 h-5 w-5" resizeMode="contain" source={icons.google} />
        )}
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
