import {  Bell, Mail,  Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyTestimonialsState() {
  return (
    // Clean, fluid flex container that respects parent layout bounds
    <div className="flex w-full items-center justify-center py-6">
      <Empty className="max-w-sm px-0 py-0">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Users />
          </EmptyMedia>
          <EmptyTitle>No Testimonials Available</EmptyTitle>
          <EmptyDescription>
            There are currently no testimonials  Available on the Platfrom. Check back soon or set up an alert to find out when new testimonials arrive.
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
