import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import useCustomerOrders from "../hooks/useCustomerOrders";
import { CustomerScreenNavigarionProp } from "../src/screens/CustomersScreen";
import { Icon } from "@rneui/themed";

type Props = {
  email: string;
  name: string;
  userId: string;
};

const CustomerCards = ({ name, email, userId }: Props) => {
  const navigation = useNavigation<CustomerScreenNavigarionProp>();
  const { loading, error, orders } = useCustomerOrders(userId);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyModal", { name: name, userId: userId })
      }
    >
      <View className="p-5 rounded-lg">
        <View>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-2xl font-bold">{name}</Text>
              <Text className="text-sm text-[#59c1cc]">ID: {userId}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-end">
            <Text className="text-[#59c1cc]">
              {loading ? "loading..." : `${orders.length} x`}
            </Text>
            <Icon
              containerStyle={{ marginBottom: "20px", marginLeft: "auto" }}
              name="box"
              type="entypo"
              color="#59c1cc"
              size={50}
            />
          </View>

          <Text>{email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerCards;
