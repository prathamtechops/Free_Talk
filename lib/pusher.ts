import PusherServer from "pusher";
import PusherClient from "pusher-js";

if (
  !process.env.PUSHER_APP_ID ||
  !process.env.NEXT_PUBLIC_PUSHER_APP_KEY ||
  !process.env.PUSHER_SECRET ||
  !process.env.PUSHER_CLUSTER
) {
  throw new Error(
    "PUSHER_APP_ID, NEXT_PUBLIC_PUSHER_APP_KEY, PUSHER_SECRET, PUSHER_CLUSTER must be provided"
  );
}

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  {
    cluster: process.env.PUSHER_CLUSTER,
  }
);
