import clsx from 'clsx';
import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { icons } from '~/constants';
import { formatDate, formatTime } from '~/lib/utils';
import { IRide } from '~/types/type';

const RideCard: FC<{ ride: IRide }> = ({ ride }) => {
  return (
    <View className="mb-3 flex-row items-center justify-center rounded-lg bg-white shadow-sm shadow-neutral-300">
      <View className="items-center justify-center p-3">
        <View className="flex-row items-center justify-between">
          <Image
            className="h-[90px] w-[80px] rounded-lg"
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
          />
          <View className="mx-5 flex-1 gap-y-5">
            <View className="flex-row items-center gap-x-2">
              <Image className="aspect-square w-5" source={icons.to} />
              <Text className="font-JakartaMedium text-base" numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>
            <View className="flex-row items-center gap-x-2">
              <Image className="aspect-square w-5" source={icons.point} />
              <Text className="font-JakartaMedium text-base" numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-5 w-full items-start justify-center rounded-lg  p-3">
          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="font-JakartaMedium text-base text-gray-500">Date & Time</Text>
            <Text className="font-JakartaMedium text-base text-gray-500">
              {formatDate(ride.created_at)}
              {formatTime(ride.ride_time)}
            </Text>
          </View>
          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="font-JakartaMedium text-base text-gray-500">Driver</Text>
            <Text className="font-JakartaMedium text-base text-gray-500">
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>
          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="font-JakartaMedium text-base text-gray-500">Car Seats</Text>
            <Text className="font-JakartaMedium text-base text-gray-500">
              {ride.driver.car_seats}
            </Text>
          </View>
          <View className="mb-5 w-full flex-row items-center justify-between">
            <Text className="font-JakartaMedium text-base text-gray-500">Payment</Text>
            <Text
              className={clsx(
                'font-JakartaMedium text-base capitalize',
                ride.payment_status === 'paid' ? 'text-green-500' : 'text-red-500'
              )}>
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
