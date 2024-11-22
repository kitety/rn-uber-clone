import { useReactive } from 'ahooks';
import { Link } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import CustomButton from '~/components/customButton';
import InputField from '~/components/inputField';
import OAuth from '~/components/oauth';
import { icons, images } from '~/constants';

const SignIn = () => {
  const state = useReactive({
    email: '',
    password: '',
  });

  const onSignInPress = () => {
    console.log('state', state);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image className="z-0 h-[250px] w-full" source={images.signUpCar} />
          <Text className="bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">Welcome</Text>
        </View>
        <View className="p-5">
          <InputField
            icon={icons.email}
            label="Email"
            placeholder="Enter your email"
            value={state.email}
            onChangeText={(text) => {
              state.email = text;
            }}
          />
          <InputField
            secureTextEntry
            icon={icons.lock}
            label="Password"
            placeholder="Enter your password"
            value={state.password}
            onChangeText={(text) => {
              state.password = text;
            }}
          />
          <CustomButton className="mt-6" title="Sign In" onPress={onSignInPress} />
          <OAuth />
          <Link
            className="mt-10 flex flex-row text-center text-lg text-general-200"
            href="/sign-up">
            <Text>Don't have an account?</Text>&nbsp;
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
