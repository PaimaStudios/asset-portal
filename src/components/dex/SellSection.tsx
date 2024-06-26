import { Button, Stack, Typography } from "@mui/material";
import useGetSellableAssets from "../../hooks/dex/useGetSellableAssets";
import SellableAssetsGrid from "./SellableAssetsGrid";
import { Asset } from "@utils/dex/types";
import { useState } from "react";
import SellForm from "./SellForm";
import useGetGameAssetMetadata from "@hooks/dex/useGetGameAssetMetadata";

type Props = {
  advancedMode: boolean;
};

export default function SellSection({ advancedMode }: Props) {
  const { data: assets } = useGetSellableAssets();
  const { data: assetMetadata } = useGetGameAssetMetadata();
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  const handleSelectAll = () => {
    if (!assets) return;
    setSelectedAssets(assets.stats);
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 3, width: "100%" }}>
      {advancedMode &&
        assets &&
        (assets.total > 0 ? (
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="body2">
              Select which {assetMetadata?.fromSym} you want to&nbsp;sell
            </Typography>
            <Button onClick={handleSelectAll}>Select&nbsp;all</Button>
          </Stack>
        ) : (
          <Typography variant="body2">
            You have no {assetMetadata?.fromSym} to sell
          </Typography>
        ))}
      {advancedMode && (
        <SellableAssetsGrid
          assets={assets?.stats}
          selectedAssets={selectedAssets}
          setSelectedAssets={setSelectedAssets}
        />
      )}
      <SellForm selectedAssets={selectedAssets} advancedMode={advancedMode} />
    </Stack>
  );
}
