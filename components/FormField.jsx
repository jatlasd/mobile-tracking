import { View, Text, TextInput } from "react-native";
import React from "react";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, isNotes }) => {
  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className="text-base text-dark-blue-2 font-pmedium">{title}</Text>
      <View className={`flex-row items-center w-full h-16 px-4 border-2 border-dark-blue-2 bg-black-100 rounded-2xl ${isNotes ? 'min-h-[100px]' : ''}`}>
        <TextInput
          className="flex-1 text-base text-dark-blue-2 font-psemi"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          multiline={isNotes}
        />
      </View>
    </View>
  );
};

export default FormField;
