import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SurveyResponse } from "@/models/survey.model";
import { Gender } from "@/enums/Gender";
const {width} = Dimensions.get('window')
const SurveyItem = (props: SurveyResponse) => {
  const {
    fullName,
    email,
    age,
    gender,
    feedback,
    phoneNumber,
    dateOfBirth,
    rating,
    today,
    color,
    agree,
  } = props;
  return (
    <View style={[styles.container, { backgroundColor: '#ccc' }]}>
      <Text style={styles.title}>Họ và tên: {fullName}</Text>
      <Text>Email: {email}</Text>
      <Text>Tuổi: {age}</Text>
      <Text>
        Giới tính:{" "}
        {gender === Gender.MALE
          ? "Nam"
          : gender === Gender.FEMALE
          ? "Nữ"
          : "Khác"}
      </Text>
      <Text>Số điện thoại: {phoneNumber}</Text>
      <Text>Ngày sinh: {new Date(dateOfBirth).toLocaleDateString()}</Text>
      <Text>Ngày khảo sát: {new Date(today).toLocaleDateString()}</Text>
      <Text>Đánh giá: {rating}/10</Text>
      <Text>Đồng ý điều khoản: {agree ? "Có" : "Không"}</Text>
      <Text>Phản hồi:</Text>
      <Text style={styles.feedback}>{feedback}</Text>
    </View>
  );
};

export default SurveyItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: width - 40
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  feedback: {
    marginTop: 4,
    fontStyle: "italic",
  },
});
