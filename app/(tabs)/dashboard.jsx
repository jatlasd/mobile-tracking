import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardComponent from "../../components/CardComponent";
import { BACKEND_ENTRIES_FETCH } from "../../constants/urls";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const displayDate = new Date().toLocaleDateString("en-US", {
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

  const noEntries = entries.length === 0;

  return (
    <SafeAreaView className="h-full bg-tiffany-300 ">
      <View className="self-center border-b-2 border-dark-blue-2">
        <Text className="mt-20 text-4xl text-center font-pbold text-dark-blue-2">
          {weekday}
        </Text>
        <Text className="mb-2 text-xl text-center font-pbold text-dark-blue-2">
          {displayDate}
        </Text>
      </View>
      <ScrollView>
        <View
          className='w-full items-center min-h-[85vh] px-4'
        >
          <View className="flex-row flex-wrap justify-center pt-10 mb-10">
            {!noEntries ? (
              entries.map((entry) => (
                <CardComponent entry={entry} key={entry._id} />
              ))
            ) : (
              <Text className="mt-20 text-4xl text-center font-pbold text-dark-blue-2">
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
