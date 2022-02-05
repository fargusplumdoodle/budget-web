import { getServerURL } from "../util/window";

const CLIENT_ID = "web-client";
const CALLBACK_URL = `${getServerURL()}/auth/callback`;

const settings = {
  auth: {
    clientId: CLIENT_ID,
    tokenUri: "/o/token",
    clientSecret:
      "8obfUZIyyTcwHjCcl2Fv51P1OilFsgvp8TxHsBXyTawDi0Lozr2kAIhy6Z4bjJchP32SqUzezv1N0BxO0cZ02JMK2jsNZMG6jCd8sp9ejYDvUqVW2XePshD3COCPlv",
    callbackUrl: CALLBACK_URL,
    ApiLoginUrl:
      `${getServerURL(true)}/o/authorize` +
      "?response_type=code" +
      `&client_id=${CLIENT_ID}` +
      `&redirect_uri=${CALLBACK_URL}`,
  },
  expectedBudgets: ["savings"],
  expectedTags: ["income", "transfer"],
};
export default settings;
