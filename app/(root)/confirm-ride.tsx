import { FC } from 'react';
import { FlatList } from 'react-native';
import DriveCard from '~/components/driveCard';
import { drivers } from '~/components/map';
import RideLayout from '~/components/rideLayout';

const ConfirmRide: FC = () => {
  return (
    <RideLayout snapPoints={['65%', '85%']} title="Confirm Ride">
      <FlatList
        data={drivers}
        renderItem={(item) => <DriveCard item={item} selected={0} setSelected={() => {}} />}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
