import { PushNotificationType } from "@/src/services/types";

const API_URL = "https://www.blacarklimo.com";

const Jobs = {
  notifyAdmin: (notification: PushNotificationType) => {
    try {
      fetch(`${API_URL}/api/admin/notifications/send`, {
        method: "POST",
        body: JSON.stringify({ notification }),
      });
    } catch (error) {
      console.log("Job__notification Err: ", error);
    }
  },
};

export default Jobs;
