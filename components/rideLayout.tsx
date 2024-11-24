import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { FC, PropsWithChildren, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { icons } from '~/constants';
import Map from './map';

const RideLayout: FC<PropsWithChildren<{ title: string; snapPoints?: string[] }>> = ({
  children,
  title,
  snapPoints,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="h-screen bg-blue-500">
          <View className="absolute top-16 z-10 flex-row items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white">
                <Image className="h-6 w-6" resizeMode="contain" source={icons.backArrow} />
              </View>
            </TouchableOpacity>
            <Text className="ml-5 font-JakartaSemiBold text-xl">{title || 'Go Back'}</Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          detached
          index={1}
          keyboardBehavior="extend"
          ref={bottomSheetRef}
          snapPoints={snapPoints || ['40%', '85%']}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>{children}</BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
