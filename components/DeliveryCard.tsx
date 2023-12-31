import { View, Text } from "react-native";
import { Card, Divider } from "@rneui/themed";
import { Icon } from "@rneui/base";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  return (
    <Card
      containerStyle={{
        backgroundColor: fullWidth ? "#EB6A7C" : "#59c1cc",
        marginHorizontal: fullWidth ? 0 : 8,
        padding: 0,
        paddingTop: 16,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: fullWidth ? 0 : 10,
      }}
    >
      <View
        className="items-start p-5 mt-3"
        style={fullWidth && { height: "100%" }}
      >
        <Icon name="box" type="entypo" size={50} color="white" />
        <View className="items-start p-5 -mt-3">
          <View className="mx-auto">
            <Text className="text-xs text-center uppercase text-white font-bold">
              {order.carrier} - {order.trackingId}
            </Text>
            <Text className="text-white text-center text-lg font-bold">
              Expected Delivery:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color="white" />
          </View>

          <View className="mx-auto">
            <Text className="text-base text-center text-white font-bold mt-5">
              Address
            </Text>
            <Text className="text-sm text-center text-white">
              {order.Address}, {order.City}
            </Text>

            <Text className="text-sm text-center text-white italic">
              Shipping Cost: €{order.shippingCost}
            </Text>
          </View>
        </View>
      </View>
      <Divider color="white" />
      <View className="p-5">
        {order.trackingItems.items.map((item) => (
          <View
            key={item.item_id}
            className="flex-row justify-center items-center"
          >
            <Text className="text-sm text-white italic">{item.name}</Text>
            <Text className="text-xl text-white">x {item.quantity}</Text>
          </View>
        ))}
      </View>
      <MapView
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={[{ flexGrow: 1, width: "100" }, !fullWidth && { height: 200 }]}
      >
        {order.Lat && order.Lng && (
          <Marker
            coordinate={{
              latitude: order.Lat,
              longitude: order.Lng,
            }}
            title="Delivery Location"
            description={order.Address}
            identifier="destination"
          />
        )}
      </MapView>
    </Card>
  );
};

export default DeliveryCard;
