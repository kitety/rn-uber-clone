import clsx from 'clsx';
import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';
import { icons } from '~/constants';

const TabIcon = ({ focused, source }: { focused: boolean; source: ImageSourcePropType }) => {
  return (
    <View
      className={clsx(
        'h-12 w-12 flex-row items-center justify-center rounded-full',
        focused && 'bg-general-300'
      )}>
      <View
        className={clsx(
          'aspect-square w-full items-center justify-center rounded-full',
          focused && 'bg-general-400'
        )}>
        <Image className="h-7 w-7" resizeMode="contain" source={source} tintColor={'white'} />
      </View>
    </View>
  );
};
const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          paddingBottom: 24,
          overflow: 'hidden',
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />,
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Rides',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
