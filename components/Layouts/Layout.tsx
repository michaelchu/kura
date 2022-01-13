import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import React from "react";
import Script from "next/script";
import TransactionModal from "../../components/Modals/TransactionModal";
import useModal from "../../hooks/useModal";
import ADD_TRANSACTION from "../../api/mutations/AddTransaction.graphql";
import CustomToast from "../CustomToast";

export default function Layout(props) {
  // const addTrans = useMutation(
  // (variables) => {
  // return graphQLClient.request(ADD_TRANSACTION, variables);
  // },
  // {
  //   onSuccess: () => {
  // queryClient.invalidateQueries("dashboard_query").then(() => {
  //   showFinishedToastToggle();
  // });
  // },
  // onError: () => {
  // showErrorToastToggle();
  //   },
  // }
  // );

  const { isShowing: isModalShowing, toggle: ModalToggle } = useModal();
  const { isShowing: isFinishedToastShowing, toggle: showFinishedToastToggle } =
    useModal();
  const { isShowing: isErrorToastShowing, toggle: showErrorToastToggle } =
    useModal();

  return (
    <div>
      <Header />
      <NavBar toggleModal={ModalToggle} />
      <div className="page-wrapper">
        <div className="container-xl">{props.children}</div>
        <Footer />
      </div>
      <TransactionModal
        show={isModalShowing}
        handleClose={() => ModalToggle()}
        handleCloseAndAdd={(data) => {
          ModalToggle();
          // addTrans.mutate(data);
        }}
      />
      <CustomToast
        style={{ background: "#2fb344", color: "#fff", border: 0 }}
        onClose={showFinishedToastToggle}
        show={isFinishedToastShowing}
        msg={"Transaction updated!"}
      />

      <CustomToast
        style={{ background: "#d63939", color: "#fff", border: 0 }}
        onClose={showErrorToastToggle}
        show={isErrorToastShowing}
        msg={"Error updating transaction!"}
      />
      <Script src="https://unpkg.com/@tabler/core@latest/dist/js/tabler.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/litepicker@2.0.11/dist/litepicker.js" />
    </div>
  );
}
