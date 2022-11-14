import * as yup from "yup";
import { selectTagByName, store } from "../../../store";

export const tagSchema = yup.object({
  name: yup.string().max(30).required(),
});
