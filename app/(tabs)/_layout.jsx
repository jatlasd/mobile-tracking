import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
import { WEBSITE_URL } from "../../constants/urls";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }}
      />
      <Text
        style={{
          fontWeight: focused ? "600" : "400",
          fontSize: 12,
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ff9c55",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#283a53",
            borderTopWidth: 1,
            borderTopColor: "#141d29",
            height: 70,
            padding: 5,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.dashboard}
                color={color}
                name="Dashboard"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: "Add",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.add}
                color={color}
                name="Add"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="quickadd"
          options={{
            title: "Quick Add",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.quickadd}
                color={color}
                name="Quick Add"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="website"
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault(); // Prevent default action
              Linking.openURL(WEBSITE_URL); // Redirect to website URL
            },
          })}
          options={{
            title: 'Website',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.website} // Ensure you have a 'web' icon in your icons file
                color={color}
                name="Website"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
