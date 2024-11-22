import { useReactive } from 'ahooks';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import CustomButton from '~/components/customButton';
import { onboarding } from '~/constants';

const Welcome = () => {
  const state = useReactive({
    activeIndex: 0,
  });
  const swiperRef = useRef<Swiper>(null);
  const onSkip = () => {
    router.replace('/(auth)/sign-up');
  };
  const isLastSlide = state.activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="h-full flex-1 items-center justify-between bg-white">
      <TouchableOpacity className="flex w-full items-end justify-end p-5" onPress={onSkip}>
        <Text className="font-JakartaBold text-base text-black">Skip</Text>
      </TouchableOpacity>
      <Swiper
        activeDot={<View className="mx-1 h-1 w-8 rounded-full bg-[#0286ff]" />}
        dot={<View className="mx-1 h-1 w-8 rounded-full bg-[#e2e8f0]" />}
        loop={false}
        ref={swiperRef}
        onIndexChanged={(index) => {
          state.activeIndex = index;
        }}>
        {onboarding.map((item) => (
          <View className="flex items-center justify-center p-5" key={item.id}>
            <Image className="h-[300px] w-full" resizeMode="contain" source={item.image} />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-black">{item.title}</Text>
            </View>
            <Text className="mx-10 mt-3 text-center font-JakartaSemiBold text-base text-[#858585] ">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        className="mt-10 !w-11/12"
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() => {
          if (isLastSlide) {
            router.replace('/(auth)/sign-up');
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Welcome;
