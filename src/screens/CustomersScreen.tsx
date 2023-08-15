import { Image, ScrollView, TextInput, View } from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { TabStackParamsList } from "../../navigator/TabNavigator";
import { RootStackParamList } from "../../navigator/RootNavigator";
import { GET_CUSTOMERS } from "../../graphql/queries";
import CustomerCards from "../../components/CustomerCards";

export type CustomerScreenNavigarionProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const [input, setInput] = useState<string>("");
  const navigation = useNavigation<CustomerScreenNavigarionProp>();
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView className="bg-[#59c1cc]">
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        alt="Header image"
        className="w-full h-64"
      />

      <View className="bg-[#fff] py-5 px-10">
        <TextInput
          placeholder="Search by Customer"
          value={input}
          onChangeText={(text) => setInput(text)}
          className="border-b-[1px] border-b-[#808080]"
          underlineColorAndroid="transparent"
        />
      </View>
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => {
          <CustomerCards key={ID} email={email} name={name} userId={ID} />;
        })}
    </ScrollView>
  );
};

export default CustomersScreen;
