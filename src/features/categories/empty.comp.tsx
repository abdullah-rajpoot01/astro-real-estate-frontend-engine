import { Bell, Mail, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyCategoriesStateComp() {
  return (
    // Clean, fluid flex container that respects parent layout bounds
    <div className="flex w-full items-center justify-center py-6">
      <Empty className="max-w-sm px-0 py-0">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle>No Property Types Available</EmptyTitle>
          <EmptyDescription>
            There are currently no Property Types listed on the market. Check back soon or set up an alert to find out when new properties arrive.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap gap-2 *:mx-auto">
            <Button>
              <Bell /> Get Alerts
            </Button>
            <Button variant="outline">
              <Mail /> Contact Agent
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
