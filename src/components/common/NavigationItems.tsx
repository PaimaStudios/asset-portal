import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";

type Item = {
  label: string;
  href: string;
};

const items: Item[] = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "NFT marketplace", href: "/marketplace" },
  { label: "NFT drop", href: "/drop" },
  { label: "Tarochi Gold Dex", href: "/dex/tarochi/tgold" },
];

type Props = {
  showWallet?: boolean;
  onClick?: () => void;
};

export default function NavigationItems({
  showWallet = false,
  onClick,
}: Props) {
  return (
    <Stack sx={{ width: "100%", gap: 1, overflowY: "auto" }}>
      {showWallet && <ConnectWallet />}
      {items.map((item) => (
        <Link to={item.href} key={item.href}>
          <Button
            variant="text"
            sx={{ width: "100%", justifyContent: "start" }}
            onClick={onClick}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </Stack>
  );
}
