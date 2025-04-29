import SurveyItem from "@/components/Survey/SurveyItem";
import { useSurveyForm } from "@/hooks/useSurveyForm";
import SurveyForm from "@/modals/SurveyForm";
import { Button } from "@react-navigation/elements";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";

export function Updates() {
  const { loading, surveys, isRefreshing, pullToRefresh } = useSurveyForm();
  return (
    <View style={styles.container}>
      <Button screen="SurveyForm" style={{marginBottom: 20}}>Open survey form</Button>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={surveys}
          refreshing={isRefreshing}
          onRefresh={pullToRefresh}
          renderItem={({item}) => <SurveyItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View>
              {surveys?.length === 0 && <Text>Khong co survey nao</Text>}
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
