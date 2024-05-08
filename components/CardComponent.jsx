import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import icons from "../constants/icons";
import DialogComponent from "./DialogComponent";
import { useState } from "react";
import { BACKEND_ENTRIES_FETCH } from "../constants/urls";

const CardComponent = ({ entry }) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const deleteEntry = async () => {
    try {
      const res = await fetch(`${BACKEND_ENTRIES_FETCH}/${entry._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: entry._id,
        }),
      });
      if (res.ok) {
        console.log("Entry deleted successfully");
      } else {
        console.error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  return (
    <Card className="w-[220px] m-2">
      <Card.Content className="flex-row break-word">
        <View className="absolute right-3 top-2">
          <TouchableOpacity onPress={showDialog}>
            <Image source={icons.trash} className="w-6 h-6 blue-500" />
            <DialogComponent
              visible={visible}
              hideDialog={hideDialog}
              displayText="Are you sure you want to delete this entry?"
              handlePress={deleteEntry}
              buttonText="Delete"
              mt="mt-2"
            />
          </TouchableOpacity>
        </View>
        <View className="flex w-6/12">
          <View className="flex-row ">
            <Text className="font-pbold">Symptom: </Text>
            <Text className="font-pregular ">{entry.symptom}</Text>
          </View>
          <View className="flex-row">
            <Text className="font-pbold">Trigger: </Text>
            <Text className="font-pregular">{entry.trigger}</Text>
          </View>
          <View className="flex-row">
            <Text className="font-pbold">Time: </Text>
            <Text className="font-pregular">{entry.time}</Text>
          </View>
          <View className="flex-row">
            <Text className="font-pbold">Severity: </Text>
            <Text className="font-pregular">{entry.severity}</Text>
          </View>
          <View className="flex-row w-full">
            <Text className="font-pbold">Notes: </Text>
            <Text className="w-5/6 break-all font-pregular">{entry.notes}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
