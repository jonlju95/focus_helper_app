import { Text, View } from "react-native";
import TopBar from "@/components/ui/TopBar";

export default function Index() {
  return (
      <>
          <TopBar title={'Overview'}/>
          <View
              style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
              }}
          >
              <Text>Overview screen</Text>
          </View>
      </>

  );
}