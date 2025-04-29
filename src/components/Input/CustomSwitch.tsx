import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form';
interface SwitchProps {
    title: string,
    control?:any,
    name: string,
}
const CustomeSwitch = ({title,control,name}:SwitchProps) => {
    return (
        <View key={name}>
          <Text style={{ fontWeight: "600", marginBottom: 8 }}>{title}</Text>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>
      );
}

export default CustomeSwitch

const styles = StyleSheet.create({})