import { useQuery } from "@apollo/client";
import Layout from "../../../components/Layouts/Layout";
import STRATEGY_DETAIL from "../../../api/queries/StrategyDetail.graphql";
import { useRouter } from "next/router";
import { StrategyDetailColumns } from "../../../components/Tables/TableColumns/StrategyDetailColumns";
import { StrategyDetailSKColumns } from "../../../components/Tables/TableColumns/StrategyDetailSkColumns";
import GenericReactTable from "../../../components/Tables/GenericReactTable";
import SkeletonTable from "../../../components/Tables/SkeletonTable";
import React from "react";
import _ from "lodash";
import accounting from "accounting";
import StatCard from "../../../components/Dashboard/StatCard";

export default function StrategyDetail() {
  const router = useRouter();
  // @ts-ignore
  const {
    root,
    strategyId,
  }: {
    root: string;
    strategyId: string;
  } = router.query;
  const { data, loading, error } = useQuery(STRATEGY_DETAIL, {
    variables: { root, strategyId },
  });

  if (loading) return <Layout />;
  if (error) return `Error! ${error.message}`;

  const total_costs = () => {
    return _.round(
      data.strategyDetails.reduce(
        (acc, { totalCost }) => parseFloat(totalCost) + acc,
        0
      ),
      2
    );
  };
  const total_fees = () => {
    return _.round(
      data.strategyDetails.reduce((acc, { fee }) => parseFloat(fee) + acc, 0),
      2
    );
  };

  const cost_basis = () => {
    let tc = total_costs();
    if (data.strategy?.id == "covered-stock") {
      const total_quantity = data.strategyDetails
        .filter(({ assetType }) => assetType == "stock")
        .reduce((acc, { quantity }) => quantity + acc, 0);

      return _.round(tc / total_quantity, 2);
    } else {
      return tc;
    }
  };

  return (
    <Layout>
      <div className={"container-xl"}>
        <div className="page-body">
          <div className="row row-cards">
            <div className="col-6 col-sm-4 col-lg-4">
              <StatCard
                title={"Current Cost Basis"}
                value={accounting.formatMoney(cost_basis())}
                pct_chg={-2.65}
              />
            </div>
            <div className="col-6 col-sm-4 col-lg-4">
              <StatCard
                title={"Total Costs"}
                value={accounting.formatMoney(total_costs())}
                pct_chg={-5.25}
              />
            </div>
            <div className="col-sm-4 col-lg-4">
              <StatCard
                title={"Total Fees"}
                value={accounting.formatMoney(total_fees())}
                pct_chg={4.34}
              />
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Strategy Details for {root} {"("}
                    {data.strategy?.label}
                    {")"}
                  </h3>
                </div>
                <GenericReactTable
                  subProps={StrategyDetailColumns}
                  data={data.strategyDetails}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
