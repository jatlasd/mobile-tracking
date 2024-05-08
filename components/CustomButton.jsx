import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      className={`bg-tiffany-500 rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
      onPress={handlePress}
      activeOpacity={0.7}

    >
      <Text className={`text-dark-blue-2 font-psemi text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
