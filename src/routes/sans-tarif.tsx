import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

export const Route = createFileRoute("/sans-tarif")({
  component: SansTarif,
  head: () => ({
    meta: [
      { title: "MIH - Mon Incroyable Histoire | Kit Média" },
      {
        name: "description",
        content:
          "Kit média de MIH - Mon Incroyable Histoire. Formats partenaires, audiences et performances.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet" },
    ],
  }),
});

function SansTarif() {
  return <Index showPrices={false} />;
}
