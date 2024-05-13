import { View, Text } from "react-native";
import { SegmentedButtons } from 'react-native-paper'
import FormField from './FormField'
import CustomButton from './CustomButton'
import React from "react";

const FormComponent = ({type, entry, form, setForm, submitForm}) => {
  return (
    <View className="w-full justify-center min-h-[85vh] px-4 py-6 mt-4">
      <FormField
        title="Symptom"
        value={type==='new' ? form.symptom : entry.symptom}
        placeholder="Enter symptom"
        handleChangeText={(e) => setForm(prevForm => ({ ...prevForm, symptom: e }))}
      />
      <FormField
        title="Trigger"
        value={type==="new" ? form.trigger : entry.trigger}
        placeholder="Enter Trigger"
        handleChangeText={(e) => setForm(prevForm => ({ ...prevForm, trigger: e }))}
        otherStyles={"my-6"}
      />
      <Text className="mb-2 text-base text-dark-blue-2 font-pmedium">
        Severity
      </Text>
      <SegmentedButtons
        theme={{
          colors: {
            secondaryContainer: "#9aefdb",
            onSecondaryContainer: "#283a53",
            onSurface: "#283a53",
            outline: "#283a53",
            primary: "#283a53",
          },
        }}
        value={type==="new" ? form.severity : entry.severity}
        onValueChange={(value) => setForm({ ...form, severity: value })}
        buttons={[
          { value: 1, label: "1" },
          { value: 2, label: "2" },
          { value: 3, label: "3" },
          { value: 4, label: "4" },
          { value: 5, label: "5" },
        ]}
      />
      <FormField
        title="Notes"
        value={type==="new" ? form.notes : entry.notes}
        placeholder="Enter Notes"
        handleChangeText={(e) => setForm(prevForm => ({ ...prevForm, notes: e }))}
        otherStyles={"mt-6 mb-20"}
        isNotes={true}
      />
      <CustomButton title="Submit" handlePress={submitForm} />
    </View>
  );
};

export default FormComponent;
