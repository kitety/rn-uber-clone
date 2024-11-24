import { router } from 'expo-router';
import { FC } from 'react';
import { FlatList, View } from 'react-native';
import CustomButton from '~/components/customButton';
import DriveCard from '~/components/driveCard';
import { drivers } from '~/components/map';
import RideLayout from '~/components/rideLayout';

const ConfirmRide: FC = () => {
  return (
    <RideLayout snapPoints={['65%', '85%']} title="Confirm Ride">
      <FlatList
        data={drivers}
        renderItem={({ item }) => <DriveCard item={item} selected={0} setSelected={() => {}} />}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => {
                router.push('/(root)/book-ride');
              }}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
