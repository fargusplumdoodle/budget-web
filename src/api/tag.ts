import { Tag } from "../store/types/models";
import { makePaginatedRequest } from "./util";
import { SerializedTag } from "./types";
import { deserializeTag } from "../util/serializers";

export async function receiveTags(): Promise<Tag[]> {
  const serializedTags = await makePaginatedRequest<SerializedTag>(
    "/api/v2/tag/"
  );
  return serializedTags.map((tag) => deserializeTag(tag));
}
