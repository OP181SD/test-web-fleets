import { FleetsView } from "@/components/fleets";
import { QueryProvider } from "@/components/providers/query-provider";

export default function FleetsPage() {
  return (
    <QueryProvider>
      <FleetsView />
    </QueryProvider>
  );
}
