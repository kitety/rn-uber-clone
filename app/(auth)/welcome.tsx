import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const router = useRouter();
  const onSkip = () => {
    router.replace('./sign-up');
  };
  return (
    <SafeAreaView className="h-full flex-1 items-center justify-between bg-white">
      <TouchableOpacity className="flex w-full items-end justify-end p-5" onPress={onSkip}>
        <Text className="font-JakartaBold text-base text-black">Skip</Text>
      </TouchableOpacity>
      <Swiper
        activeDot={<View className="mx-1 h-1 w-8 rounded-full bg-[#0286ff]" />}
        dot={<View className="mx-1 h-1 w-8 rounded-full bg-[#e2e8f0]" />}
        loop={false}
        ref={swiperRef}>
        <View>
          <Text>Hello</Text>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

export default Welcome;
