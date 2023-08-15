import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { TabStackParamsList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";

type Props = {
  item: Order;
};

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderCard = ({ item }: Props) => {
  const navigation = useNavigation<OrderScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card containerStyle={{ paddingHorizontal: 20, borderRadius: 10 }}>
        <View className="flex-row justify-center items-center">
          <View>
            <Icon
              name="truck-deliverty"
              type="material-community"
              color={"#EB6A7C"}
            />
            <Text className="text-sm">
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>

          <View>
            <Text className="text-gray-400 text-sm">
              {item.carrier}-{item.trackingId}
            </Text>
            <Text className="text-gray-500 text-xl">
              {item.trackingItems.customer.name}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-sm text-[#EB6A7C]">
              {item.trackingItems.items.length} x
            </Text>
            <Icon className="ml-2" name="box" type="feather" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
