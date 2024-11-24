import clsx from 'clsx';
import { FC } from 'react';
import { Image, Pressable, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { icons } from '~/constants';
import { IGoogleInputProps } from '~/types/type';

const GoogleTextInput: FC<IGoogleInputProps> = ({
  containerStyle,
  icon,
  handlePress,
  initialLocation,
  textInputBackgroundColor,
}) => {
  const key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY!;
  return (
    <Pressable
      className={clsx(
        'relative z-50 mb-5 flex-row items-center justify-center rounded-xl',
        containerStyle
      )}
      onPress={() => {
        handlePress();
      }}>
      <GooglePlacesAutocomplete
        fetchDetails
        debounce={200}
        placeholder="Where you wanna go?"
        query={{
          key,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View className="h-6 w-6 items-center justify-center">
            <Image className="h-6 w-6" resizeMode="contain" source={icon || icons.search} />
          </View>
        )}
        styles={{
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,
            position: 'relative',
            shadowColor: '#d4d4d4',
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || 'white',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
            width: '100%',
            borderRadius: 20,
          },
          listView: {
            backgroundColor: textInputBackgroundColor ? textInputBackgroundColor : 'white',
            position: 'relative',
            top: 0,
            width: '100%',
            borderRadius: 10,
            shadowColor: '#d4d4d4',
            zIndex: 99,
          },
        }}
        textInputProps={{
          placeholderTextColor: 'gray',
          placeholder: 'Where you wanna go?',
        }}
        onPress={(data, details) => {
          console.log(data, details);
          // handlePress({
          //   latitude: details?.geometry?.location?.lat!,
          //   longitude: details?.geometry?.location?.lng!,
          //   address: data.description,
          // });
        }}
      />
    </Pressable>
  );
};

export default GoogleTextInput;
