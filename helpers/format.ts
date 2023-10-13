import { Contract } from "~/types/entity/Contract";

export const getFormat = (format: Contract["format"]) => {
  if (format === "FACE_TO_FACE") {
    return "En présentiel";
  } else if (format === "ON_LINE") {
    return "En ligne";
  }
};
