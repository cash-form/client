import { useEffect, useState } from "react";
import {
  fetchWithAuthRetry,
  refreshTokenRequest,
} from "src/lib/api/commonFetch.utility";
import { useAuthStore } from "src/store/authStore";

export function useUserMe() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    let ignore = false;
    async function fetchUser() {
      setLoading(true);
      try {
        let token = accessToken;
        if (!token) {
          // accessToken이 없으면 refreshToken으로 재발급 시도
          try {
            token = await refreshTokenRequest();
          } catch {
            setUser(null);
            setLoading(false);
            return;
          }
        }
        const res = await fetchWithAuthRetry("/v1/users/me");
        if (!ignore && res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [accessToken]);

  return { user, loading };
}
