import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../lib/utils";

export default function useUser() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    staleTime: 30_000, //ms
  });

  return user;
}

const fetchUserData = async () => {
  try {
    return await fetchJson("/api/user");
  } catch (err) {
    // TODO: not signed in
    return undefined;
  }
};
