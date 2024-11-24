import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { icons } from '~/constants';
import { formatTime } from '~/lib/utils';
import { IDriverCardProps } from '~/types/type';

const DriverCard = ({ item, selected, setSelected }: IDriverCardProps) => {
  return (
    <TouchableOpacity
      className={`${
        selected === item.id ? 'bg-general-600' : 'bg-white'
      } flex flex-row items-center justify-between rounded-xl px-3 py-5`}
      onPress={setSelected}>
      <Image className="h-14 w-14 rounded-full" source={{ uri: item.profile_image_url }} />

      <View className="mx-3 flex flex-1 flex-col items-start justify-center">
        <View className="mb-1 flex flex-row items-center justify-start">
          <Text className="font-JakartaRegular text-lg">{item.title}</Text>

          <View className="ml-2 flex flex-row items-center space-x-1">
            <Image className="h-3.5 w-3.5" source={icons.star} />
            <Text className="font-JakartaRegular text-sm">4</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start">
          <View className="flex flex-row items-center">
            <Image className="h-4 w-4" source={icons.dollar} />
            <Text className="font-JakartaRegular ml-1 text-sm">${item.price}</Text>
          </View>

          <Text className="font-JakartaRegular mx-1 text-sm text-general-800">|</Text>

          <Text className="font-JakartaRegular text-sm text-general-800">
            {formatTime(item.time!)}
          </Text>

          <Text className="font-JakartaRegular mx-1 text-sm text-general-800">|</Text>

          <Text className="font-JakartaRegular text-sm text-general-800">
            {item.car_seats} seats
          </Text>
        </View>
      </View>

      <Image className="h-14 w-14" resizeMode="contain" source={{ uri: item.car_image_url }} />
    </TouchableOpacity>
  );
};

export default DriverCard;
