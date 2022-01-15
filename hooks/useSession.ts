import { useRouter } from "next/router";
import useStorage from "./useStorage";

export default function useSession() {
  const { getItem } = useStorage();

  const isSignedIn = () => {
    return !!getItem("token");
  };

  return { isSignedIn };
}
