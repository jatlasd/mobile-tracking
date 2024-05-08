import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import QuickButton from "../../components/QuickButton";
import {
  BACKEND_ENTRIES_FETCH,
  BACKEND_SYMPTOMS_FETCH,
  BACKEND_TRIGGERS_FETCH,
} from "../../constants/urls";
import DialogComponent from "../../components/DialogComponent";
import { useIsFocused } from "@react-navigation/native";

const formatDateAndTime = (date) => {
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { dateString, timeString };
};

const fetchData = async (url, setData) => {
  const response = await fetch(url);
  const data = await response.json();
  setData(data);
};

const QuickAdd = () => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [symptoms, setSymptoms] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [symptom, setSymptom] = useState(undefined);
  const [trigger, setTrigger] = useState(undefined);
  const isFocused = useIsFocused();

  const create = async (symptom, trigger) => {
    try {
      const { dateString, timeString } = formatDateAndTime(new Date());

      const response = await fetch(BACKEND_ENTRIES_FETCH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: dateString,
          symptom,
          trigger,
          time: timeString,
          isQuickAdd: true,
        }),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        hideDialog();
        setSymptom(undefined);
        setTrigger(undefined);
        router.push("/dashboard");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setSymptom(undefined);
      setTrigger(undefined);
      setVisible(false);
    }
  }, [isFocused]);

  useEffect(() => {
    fetchData(BACKEND_SYMPTOMS_FETCH, setSymptoms);
    fetchData(BACKEND_TRIGGERS_FETCH, setTriggers);
  }, [isFocused]);

  const isSymptomSelected = symptom !== undefined;

  const renderSymptoms = () =>
    symptoms.map((symptom) => (
      <QuickButton
        key={symptom._id}
        displayText={symptom.symptom}
        handlePress={() => {
          setSymptom(symptom.symptom);
        }}
        otherStyles="font-psemi"
      />
    ));

  const renderTriggers = () =>
    triggers.map((trigger) => (
      <QuickButton
        key={trigger._id}
        displayText={trigger.trigger}
        handlePress={() => {
          setTrigger(trigger.trigger);
          showDialog();
        }}
      />
    ));

  return (
    <SafeAreaView className="h-full bg-tiffany-300 ">
      <View className="items-center justify-center mt-10">
        <Text className="text-2xl font-pbold text-dark-blue-2">
          {!isSymptomSelected ? "Select a Symptom" : "Select a Trigger"}
        </Text>
      </View>
      <ScrollView>
        {isSymptomSelected ? (
          <View className="items-center justify-center my-10">
            <TouchableOpacity
              className="p-5 m-3 bg-tiffany-500 rounded-xl"
              onPress={() => setSymptom(undefined)}
            >
              <Text className="font-psemi text-dark-blue-2">Back to Symptoms</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="my-6"></View>
        )}
        <View className="flex-row flex-wrap justify-center">
          {!isSymptomSelected ? renderSymptoms() : renderTriggers()}
        </View>
      </ScrollView>
      <DialogComponent
        visible={visible}
        hideDialog={hideDialog}
        handlePress={() => create(symptom, trigger)}
        displayText={
          <View>
            <View className='flex-row'>
              <Text className='text-lg font-pbold text-dark-blue-2'>Symptom:{' '} </Text>
              <Text className='text-lg font-pregular text-dark-blue-2'>{symptom}</Text>
            </View>
            <View className='flex-row'>
              <Text className='text-lg font-pbold text-dark-blue-2'>Trigger:{' '} </Text>
              <Text className='text-lg font-pregular text-dark-blue-2'>{trigger}</Text>
            </View>
          </View>
        }
        buttonText="Add Entry"
        mt='mt-6'
      />
    </SafeAreaView>
  );
};

export default QuickAdd;