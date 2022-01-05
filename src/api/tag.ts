import { Tag } from "../store/types/models";
import { makePaginatedRequest, makeRequest } from "./util";
import { PaginatedResponse } from "./types";

export async function receiveTags(): Promise<Tag[]> {
  const tags: Tag[] = [];
  const maxPages = 100;

  for (let pageNumber = 0; pageNumber < maxPages; pageNumber++) {
    const r: PaginatedResponse<Tag> = await makePaginatedRequest(
      "/api/v2/tag/",
      pageNumber
    );
    tags.push(...(r.results as Tag[]));
    if (!r.next) {
      break;
    }
  }
  return tags;
}
