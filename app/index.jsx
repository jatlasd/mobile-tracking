import { View, Text, Image, ScrollView, Linking } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { WEBSITE_URL } from "../constants/urls";
import images from "../constants/images";

export default function App() {

  const openWebsite = () => {
    Linking.openURL(WEBSITE_URL)
  }


  return (
    <SafeAreaView className="items-center justify-center bg-tiffany-300 h-full">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className='min-h-[85vh] w-full justify-center items-center'>
          <Text className='text-5xl font-pbold text-tangerine-600 pt-10'>
            Hi Tara
          </Text>
          <Text className='font-psemi text-2xl mt-6 text-dark-blue-2'>
            Welcome to your app version
          </Text>
          <Image source={images.floating} className="w-72 h-72" resizeMode="contain"/>
          <CustomButton 
            title="Use App"
            handlePress={() => router.push('/(tabs)/dashboard')}
            containerStyles={'w-full  mb-10'}
          />
          <CustomButton 
            title="Open Website"
            handlePress={openWebsite}
            containerStyles={'w-full'}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
