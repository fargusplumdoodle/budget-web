import { makePaginatedRequest, makeRequest } from "../util";
import { SerializedTag } from "../types";
import { deserializeTag, serializeTag } from "../serializers";
import { Tag } from "../../store/data/tags";

export async function receiveTags(): Promise<Tag[]> {
  const serializedTags = await makePaginatedRequest<SerializedTag>(
    "/api/v2/tag/"
  );
  return serializedTags.map((tag) => deserializeTag(tag));
}
export async function createTag(data: Tag): Promise<Tag> {
  const r = await makeRequest({
    method: "post",
    url: "/api/v2/tag/",
    data: serializeTag(data),
  });
  return deserializeTag(r!.data as SerializedTag);
}

export async function updateTag(tag: Tag): Promise<Tag> {
  const r = await makeRequest({
    method: "put",
    url: `/api/v2/tag/${tag.id}/`,
    data: serializeTag(tag),
  });
  return deserializeTag(r!.data as SerializedTag);
}

export async function deleteTag(tag: Tag): Promise<void> {
  await makeRequest({
    method: "delete",
    url: `/api/v2/tag/${tag.id}/`,
  });
}
