import { User } from "~/types/entity/User";

export const getRole = (role: User["role"]) => {
  if (role === "ADMIN") {
    return "Administrateur";
  } else if (role === "SUPER_ADMIN") {
    return "Super administrateur";
  } else if (role === "USER") {
    return "Utilisateur";
  } else if (role === "CONSULTANT") {
    return "Consultant";
  }
};

export const getRoleColor = (role: User["role"]) => {
  if (role === "ADMIN") {
    return "purple";
  } else if (role === "SUPER_ADMIN") {
    return "red";
  } else if (role === "USER") {
    return "blue";
  } else if (role === "CONSULTANT") {
    return "green";
  } else {
    return "gray";
  }
};

export const getRoleList = (all?: boolean) => {
  const user = useState<User>("user");
  const roles = [
    {
      key: "USER",
      value: "Utilisateur",
    },
  ];

  if (all || user.value.role === "ADMIN" || user.value.role === "SUPER_ADMIN") {
    roles.push({
      key: "ADMIN",
      value: "Administrateur",
    });
  }
  if (all || user.value.role === "SUPER_ADMIN") {
    roles.push(
      {
        key: "SUPER_ADMIN",
        value: "Super administrateur",
      },
      {
        key: "CONSULTANT",
        value: "Consultant",
      }
    );
  }

  return roles;
};
