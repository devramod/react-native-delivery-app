import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { GET_ORDERS } from "../graphql/queries";

const useOrders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      carriers: value.carrier,
      createdAt: value.createdAt,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingItems: value.trackingItems,
      Lat: value.Lat,
      Lng: value.Lng,
      Address: value.Address,
      City: value.City,
    }));

    setOrders(orders);
  }, [data]);

  return { loading, error, orders };
};

export default useOrders;
