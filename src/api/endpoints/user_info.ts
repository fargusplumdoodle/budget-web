import { UserInfo } from "../../store/types/models";
import { makeRequest } from "../util";
import { SerializedUserInfo } from "../types";
import { deserializeUserInfo, serializeUserInfo } from "../serializers";

export async function receiveUserInfo(): Promise<UserInfo> {
  const r = await makeRequest({
    method: "get",
    url: "/api/v2/user/info",
  });
  return deserializeUserInfo(r!.data as SerializedUserInfo);
}

export async function updateUserInfo(userInfo: UserInfo): Promise<UserInfo> {
  const r = await makeRequest({
    method: "put",
    url: "/api/v2/user/info",
    data: serializeUserInfo(userInfo),
  });
  return deserializeUserInfo(r!.data as SerializedUserInfo);
}
