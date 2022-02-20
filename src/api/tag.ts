import { Tag } from "../store/types/models";
import { makePaginatedRequest, makeRequest } from "./util";
import { SerializedTag } from "./types";
import { deserializeTag, serializeTag } from "./serializers";
import { store } from "../store/configureStore";
import { beginApiCall } from "../store/actions/apiStatusActions";
import { loadTagsSuccess } from "../store/actions/tagActions";

export async function receiveTags(): Promise<Tag[]> {
  const serializedTags = await makePaginatedRequest<SerializedTag>(
    "/api/v2/tag/"
  );
  return serializedTags.map((tag) => deserializeTag(tag));
}
export async function createTag(data: Tag): Promise<Tag> {
  store.dispatch(beginApiCall());

  const r = await makeRequest({
    method: "post",
    url: "/api/v2/tag/",
    data: serializeTag(data),
  });
  const tag = deserializeTag(r.data as SerializedTag);

  store.dispatch(loadTagsSuccess([tag]));
  return tag;
}
