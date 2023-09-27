import { User } from "~/types/entity/User";

export const getRole = (role: User["role"]) => {
  if (role === "ADMIN") {
    return "Administrateur";
  } else if (role === "SUPER_ADMIN") {
    return "Super administrateur";
  } else if (role === "USER") {
    return "Utilisateur";
  }
};

export const getRoleColor = (role: User["role"]) => {
  if (role === "ADMIN") {
    return "orange";
  } else if (role === "SUPER_ADMIN") {
    return "red";
  } else if (role === "USER") {
    return "blue";
  } else {
    return "gray";
  }
};
