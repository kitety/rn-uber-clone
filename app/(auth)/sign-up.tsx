import { useSignUp } from '@clerk/clerk-expo';
import { useReactive } from 'ahooks';
import { clsx } from 'clsx';
import { Link, useRouter } from 'expo-router';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import CustomButton from '~/components/customButton';
import InputField from '~/components/inputField';
import OAuth from '~/components/oauth';
import { icons, images } from '~/constants';
import { fetchAPI } from '~/lib/fetch';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const state = useReactive({
    name: '',
    email: '',
    password: '',
    code: '',
    status: 'default',
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
      state.status = 'pending';
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    // reset error
    state.error = '';

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: state.code,
      });

      if (completeSignUp.status === 'complete') {
        // todo create a database user
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: state.name,
            email: state.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        state.status = 'success';
      } else {
        state.error = 'Verification Failed';
      }
    } catch (err: any) {
      state.error = err?.errors[0]?.longMessage || 'Verification Failed';
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
        <ReactNativeModal isVisible={['pending', 'success'].includes(state.status)}>
          {/* pending */}
          <View
            className={clsx(
              'min-h-[300px] rounded-2xl bg-white px-7 py-9',
              state.status !== 'pending' && 'hidden'
            )}>
            <Text className="mb-2 font-JakartaExtraBold text-2xl">Verification</Text>
            <Text className="mb-5 font-Jakarta">
              We've sent you a verification code to {state.email}
            </Text>
            <InputField
              icon={icons.lock}
              keyboardType="numeric"
              label="Code"
              placeholder="123456"
              value={state.code}
              onChangeText={(text) => {
                // reset error
                if (state.error) {
                  state.error = '';
                }
                state.code = text;
              }}
            />
            {state.error && <Text className="mt-1 text-sm text-red-500">{state.error}</Text>}
            <CustomButton
              className="mt-5 bg-success-500"
              title="Verify Email"
              onPress={onPressVerify}
            />
          </View>
          {/* success */}
          <View
            className={clsx(
              'min-h-[300px] rounded-2xl bg-white px-7 py-9',
              state.status !== 'success' && 'hidden'
            )}>
            <Image className="mx-auto my-5 h-[110px] w-[110px]" source={images.check} />
            <Text className="text-center font-JakartaBold text-3xl">Verified</Text>
            <Text className="mt-2 text-center font-Jakarta text-base text-gray-400">
              You have successfully verified your account
            </Text>
            <CustomButton
              className="mt-5"
              title="Browse Home"
              onPress={() => router.replace('/(root)/(tabs)/home')}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
