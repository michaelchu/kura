import { useRouter } from "next/router";
import useStorage from "./useStorage";

export default function useSession(): boolean {
  const { getItem } = useStorage();
  const isSignedIn: boolean = (() => !!getItem("token"))();
  return isSignedIn;
}
