import { router } from 'expo-router';
import { FC } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '~/components/customButton';
import GoogleTextInput from '~/components/googleTextInput';
import RideLayout from '~/components/rideLayout';
import { icons } from '~/constants';
import { useLocationStore } from '~/store';

const FindRide: FC = () => {
  const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } =
    useLocationStore();
  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="mb-3 font-JakartaSemiBold text-lg">From</Text>
        <GoogleTextInput
          containerStyle="bg-neutral-100"
          handlePress={() => {}}
          icon={icons.target}
          initialLocation={userAddress!}
          textInputBackgroundColor="#f5f5f5"
        />
      </View>
      <View className="my-3">
        <Text className="mb-3 font-JakartaSemiBold text-lg">To</Text>
        <GoogleTextInput
          containerStyle="bg-neutral-100"
          handlePress={() => {}}
          icon={icons.target}
          initialLocation={userAddress!}
          textInputBackgroundColor="transparent"
        />
      </View>
      <CustomButton
        className="mt-5"
        title="Find Now"
        onPress={() => {
          router.push('/(root)/confirm-ride');
        }}
      />
    </RideLayout>
  );
};

export default FindRide;
