import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { IButtonProps } from '~/types/type';

const getBgVariantStyle = (variant: IButtonProps['bgVariant']) => {
  switch (variant) {
    case 'secondary':
      return 'bg-gray-500';
    case 'danger':
      return 'bg-red-500';
    case 'success':
      return 'bg-green-500';
    case 'outline':
      return 'bg-transparent border-neutral-300 border-[0.5px]';
    default:
      return 'bg-[#0286FF]';
  }
};

const getTextVariantStyle = (variant: IButtonProps['textVariant']) => {
  switch (variant) {
    case 'primary':
      return 'text-black';
    case 'secondary':
      return 'text-gray-100';
    case 'danger':
      return 'text-red-100';
    case 'success':
      return 'text-green-100';
    default:
      return 'text-white';
  }
};

const CustomButton: FC<IButtonProps> = ({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant,
  IconLeft,
  IconRight,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`flex w-full flex-row items-center justify-center rounded-full p-3 shadow-md  shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)}  ${className}`}
      onPress={onPress}
      {...props}>
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
