import SurveyForm from "@/modals/SurveyForm";
import { Button } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export function Updates() {
  return (
    <View style={styles.container}>
      <Button screen="SurveyForm">Open survey form</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
