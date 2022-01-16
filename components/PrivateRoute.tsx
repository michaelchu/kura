import { useEffect } from "react";
import { useRouter } from "next/router";
import useSession from "../hooks/useSession";

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { isSignedIn } = useSession();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!isSignedIn() && pathIsProtected) {
      router.push("/login");
    }
  }, [isSignedIn(), pathIsProtected]);

  if (!isSignedIn() && pathIsProtected) {
    return "Loading...";
  }

  return children;
}
