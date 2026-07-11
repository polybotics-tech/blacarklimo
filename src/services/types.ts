export type PushNotificationType = {
  title: string;
  body: string;
  data: {
    screen: "booking" | "transaction";
    id: string;
  };
};
