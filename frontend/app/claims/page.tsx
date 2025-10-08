import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ClaimedItems() {
  return (
    <SidebarInset>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
          <h1 className="text-2xl font-bold mb-4">claims</h1>
          <p className="text-muted-foreground">page comming soon.....</p>
        </div>
      </div>
    </SidebarInset>
  )
}
