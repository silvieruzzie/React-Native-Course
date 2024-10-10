import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View } from "react-native";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import { images } from "../../constants";
import EmptyState from "../../components";


const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
          <View className="w-full flex-1 pt-5 pb-8">
            <Text className="text-white text-grade-100 text-lg font-pregular mb-3">
              Latest Videos
            </Text>

            <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []} />
          </View>
        </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home