import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardComponent from "../../components/CardComponent";
import { BACKEND_ENTRIES_FETCH } from "../../constants/urls";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weekday = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch(BACKEND_ENTRIES_FETCH);
        let data = await res.json();
        data = data.filter((item) => item.date === today);

        const timeToMinutes = (timeString) => {
          const [hour, minute] = timeString.split(":").map(Number);
          return hour * 60 + minute;
        };
        data.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

        setEntries(data);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };
    fetchEntries();
  }, [entries]);

  const noEntries = entries.length < 1;

  return (
    <SafeAreaView className="h-full bg-tiffany-300 ">
      <View className="border-b-2 border-dark-blue-2 self-center">
        <Text className="text-4xl font-pbold text-dark-blue-2 mt-20 text-center">
          {weekday}
        </Text>
        <Text className="text-xl font-pbold text-dark-blue-2 mb-2 text-center">
          {today}
        </Text>
      </View>
      <ScrollView>
        <View
          className={`w-full ${
            !noEntries ? "justify-center" : ""
          } items-center min-h-[85vh] px-4`}
        >
          <View className="flex-row justify-center flex-wrap pt-10 mb-10">
            {!noEntries ? (
              entries.map((entry) => (
                <CardComponent entry={entry} key={entry._id} />
              ))
            ) : (
              <Text className="text-center text-4xl font-pbold text-dark-blue-2 mt-20">
                No entries today
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
