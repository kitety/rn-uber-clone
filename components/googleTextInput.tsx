import clsx from 'clsx';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { IGoogleInputProps } from '~/types/type';

const GoogleTextInput: FC<IGoogleInputProps> = ({
  containerStyle,
  icon,
  handlePress,
  initialLocation,
  textInputBackgroundColor,
}) => {
  return (
    <View
      className={clsx(
        'relative z-50 mb-5 flex-row items-center justify-center rounded-xl',
        containerStyle
      )}>
      <Text>GoogleTextInput</Text>
    </View>
  );
};

export default GoogleTextInput;
