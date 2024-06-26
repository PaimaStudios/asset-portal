import useGetSellOrders from "@hooks/dex/useGetSellOrders";
import { Divider, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Fragment } from "react";
import CancelSellOrderButton from "./CancelSellOrderButton";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";
import TransactionButton from "@components/common/TransactionButton";
import { formatNumberWithSubscriptZeros } from "@haqq/format-number-with-subscript-zeros";
import {
  formatEth,
  formatUnitsWithoutStrippingTrailingZeros,
} from "@utils/evm/utils";

type Props = {
  user?: `0x${string}`;
};

export default function SellOrdersGrid({ user }: Props) {
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const { data: orders } = useGetSellOrders({ user });

  if (orders && orders.length === 0) {
    return (
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        You have no sell orders
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", textAlign: "end", alignItems: "center" }}
    >
      <Grid xs={user ? 3 : 4}>
        <Typography>Amount</Typography>
      </Grid>
      <Grid xs={user ? 3 : 4}>
        <Typography>Price/unit</Typography>
      </Grid>
      <Grid xs={user ? 3 : 4}>
        <Typography>Total</Typography>
      </Grid>
      {user && <Grid xs={3}></Grid>}
      <Divider />
      {orders && assetMetadata
        ? orders.map((order) => (
            <Fragment key={order.orderId}>
              <Grid xs={user ? 3 : 4}>
                <Typography component={"span"}>{order.amount}</Typography>
                <Typography variant="caption">
                  {" "}
                  {assetMetadata.fromSym}
                </Typography>
              </Grid>
              <Grid xs={user ? 3 : 4}>
                <Typography component={"span"}>
                  {formatNumberWithSubscriptZeros(
                    formatUnitsWithoutStrippingTrailingZeros(
                      BigInt(order.price),
                      18,
                    ),
                  )}
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {assetMetadata.toSym}
                </Typography>
              </Grid>
              <Grid xs={user ? 3 : 4}>
                <Typography component={"span"}>
                  {formatEth(BigInt(order.price) * BigInt(order.amount))}
                </Typography>
                <Typography variant="caption">
                  {" "}
                  {assetMetadata.toSym}
                </Typography>
              </Grid>
              {user && (
                <Grid xs={3}>
                  <CancelSellOrderButton
                    orderId={order.orderId}
                    dexAddress={assetMetadata.contractDex}
                  />
                </Grid>
              )}
            </Fragment>
          ))
        : Array(3)
            .fill(undefined)
            .map((_, index) => (
              <Fragment key={index}>
                <Grid xs={1}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid xs={user ? 2 : 3}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid xs={user ? 3 : 4}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid xs={user ? 3 : 4}>
                  <Skeleton variant="text" />
                </Grid>
                {user && (
                  <Grid xs={3} sx={{ display: "grid" }}>
                    <Skeleton variant="rounded" sx={{ justifySelf: "end" }}>
                      <TransactionButton actionText={"Cancel sell order"} />
                    </Skeleton>
                  </Grid>
                )}
              </Fragment>
            ))}
    </Grid>
  );
}
