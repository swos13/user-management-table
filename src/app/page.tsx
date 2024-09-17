import UserTable from "@/components/UserTable";
import ReduxProvider from "./providers/ReduxProvider";

export default async function Home() {
  return (
    <ReduxProvider>
      <UserTable></UserTable>
    </ReduxProvider>
  );
}
