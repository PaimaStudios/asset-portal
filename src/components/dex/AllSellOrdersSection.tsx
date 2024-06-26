import { Stack, Typography } from "@mui/material";
import SellOrdersGrid from "./SellOrdersGrid";

export default function AllSellOrdersSection() {
  return (
    <Stack sx={{ alignItems: "center", gap: 2, width: "100%" }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          p: 1,
          width: "100%",
        }}
      >
        <Typography variant="h4">All sell orders</Typography>
        <Typography variant="caption">
          List limited to first 100 orders
        </Typography>
      </Stack>
      <SellOrdersGrid />
    </Stack>
  );
}
