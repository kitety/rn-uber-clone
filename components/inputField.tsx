import clsx from 'clsx';
import { FC, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { IInputFieldProps } from '~/types/type';

const InputField: FC<IInputFieldProps> = ({
  label,
  labelStyle = '',
  icon,
  secureTextEntry = false,
  containerStyle = '',
  inputStyle = '',
  iconStyle = '',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`mb-3 font-JakartaSemiBold text-lg ${labelStyle}`}>{label}</Text>
          <View
            className={clsx(
              'relative flex flex-row items-center justify-start rounded-full border bg-neutral-100',
              isFocused ? 'border-primary-500' : 'border-neutral-100',
              containerStyle
            )}>
            {icon && <Image className={`ml-4 h-6 w-6 ${iconStyle}`} source={icon} />}
            <TextInput
              className={`flex-1 rounded-full p-4 font-JakartaSemiBold text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default InputField;
