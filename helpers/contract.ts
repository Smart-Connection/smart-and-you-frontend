import { Contract } from "~/types/entity/Contract";

// ========================================================== Format
export const getFormat = (format: Contract["format"]) => {
  if (format === "FACE_TO_FACE") {
    return "En présentiel";
  } else if (format === "ON_LINE") {
    return "En ligne";
  }
};

export const getFormatList = [
  {
    key: "FACE_TO_FACE",
    value: "En présentiel",
  },
  {
    key: "ON_LINE",
    value: "En ligne",
  },
];

// ========================================================== Status
export const getStatus = (format: Contract["status"]) => {
  if (format === "OPEN") {
    return "En cours";
  } else if (format === "CLOSE") {
    return "Terminé";
  }
};

export const getStatusList = [
  {
    key: "OPEN",
    value: "En cours",
  },
  {
    key: "CLOSE",
    value: "Terminé",
  },
];

// ========================================================== Get type
export const getTypeColor = (type: string) => {
  if (type === "QVT") {
    return "green";
  }
};

export const getTypeBackgroundColor = (type: string) => {
  if (type === "QVT") {
    return "bg-green-500";
  }
  return "bg-gray-300";
};

export const getType = (type: string) => {
  if (type === "QVT") {
    return "Audit QVT";
  }
};

export const getTypeList = [
  {
    key: "QVT",
    value: "Audit QVT",
  },
];
