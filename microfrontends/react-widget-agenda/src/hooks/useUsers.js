import { useState, useEffect } from "react";
import { useKeycloak } from "../auth/Keycloak";
import { fetchUsers } from "../api/users";

export function useUsers(config, users, setUsers) {
  const [isLoading, setLoading] = useState(true)
  const keycloak = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      if (keycloak.isTokenExpired()) {
        keycloak.login();
      } else {
        const request = async () => {
          const users = await fetchUsers(config, keycloak.token);
          setLoading(false);
          setUsers(users.data);
        };

        request();
      }
    }
  }, [config, keycloak, setUsers]);

  return { isLoading, users };
}
