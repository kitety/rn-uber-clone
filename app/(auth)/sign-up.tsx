import { useSignUp } from '@clerk/clerk-expo';
import { useReactive } from 'ahooks';
import { Link, useRouter } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import CustomButton from '~/components/customButton';
import InputField from '~/components/inputField';
import OAuth from '~/components/oauth';
import { icons, images } from '~/constants';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const state = useReactive({
    name: '',
    email: '',
    password: '',
    code: '',
    state: 'success',
    error: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: state.email,
        password: state.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      state.state = 'pending';
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: state.code,
      });

      if (completeSignUp.status === 'complete') {
        // todo create a database user
        await setActive({ session: completeSignUp.createdSessionId });
        state.state = 'success';
      } else {
        state.state = 'failed';
        state.error = 'Verification Failed';
      }
    } catch (err: any) {
      state.error = err.errors[0].longMessage;
      state.state = 'failed';
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image className="z-0 h-[250px] w-full" source={images.signUpCar} />
          <Text className="bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            icon={icons.person}
            label="Name"
            placeholder="Enter your name"
            value={state.name}
            onChangeText={(text) => {
              state.name = text;
            }}
          />
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
          <CustomButton className="mt-6" title="Sign Up" onPress={onSignUpPress} />
          <OAuth />
          <Link
            className="mt-10 flex flex-row text-center text-lg text-general-200"
            href="/sign-in">
            <Text>Already have an account?</Text>&nbsp;
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
        {/* verification code */}
        <ReactNativeModal isVisible={state.state === 'success'}>
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Image className="mx-auto my-5 h-[110px] w-[110px]" source={images.check} />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
