import { IconArrowLeft } from "@tabler/icons";
import useStorage from "../hooks/useStorage";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const { removeItem } = useStorage();
  const router = useRouter();

  return (
    <div className="page page-center">
      <div className="container-tight py-4">
        <div className="empty">
          <div className="empty-header">404</div>
          <p className="empty-title">Oops… You've just encountered an error</p>
          <div className="empty-action">
            <a
              className="btn btn-primary"
              onClick={() => {
                removeItem("token");
                router.push("/login");
              }}
            >
              <IconArrowLeft />
              Take me home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
