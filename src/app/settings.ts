import { DateTime } from "luxon";
import { getServerURL } from "../util/window";

const CLIENT_ID = "web-client";
const CALLBACK_URL = `${getServerURL()}/auth/callback`;

export const EXPECTED_BUDGETS = {
  SAVINGS: "savings",
  PERSONAL: "personal",
};
export const EXPECTED_TAGS = {
  INCOME: "income",
  TRANSFER: "transfer",
};

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
  expectedBudgets: Object.values(EXPECTED_BUDGETS),
  expectedTags: Object.values(EXPECTED_TAGS),
  minDate: DateTime.local(2019, 11, 2).toJSDate(),
  mobileWidth: 360
};
export default settings;
