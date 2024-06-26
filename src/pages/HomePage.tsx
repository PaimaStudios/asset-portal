import { Button, Container, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import useSetNavbarTitle from "@hooks/useSetNavbarTitle";

export default function HomePage() {
  useSetNavbarTitle("Paima Portal");
  return (
    <>
      <Container>
        <Stack
          sx={{ alignItems: "center", gap: 2, mb: 10, mt: 4 }}
          divider={
            <Divider orientation="horizontal" sx={{ width: "100%" }} />
          }
        >
          <Link to="/dex/tarochi/tgold">
            <Button variant="text">Tarochi Gold DEX</Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
}
