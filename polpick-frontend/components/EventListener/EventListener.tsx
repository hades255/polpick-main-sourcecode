/* eslint-disable import/no-cycle */
import { updateAffliateLinkClick } from "@/api/functions/game.api";
import useUser from "@/hooks/react-query/useUser";
import useEventEmitter from "@/hooks/utils/useEventEmitter";
import events from "@/json/events/events";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "sonner";

export default function EventListeners() {
  const showNotifications = useCallback(
    (data: { message: string; variant: string }) => {
      if (data.variant === "error") {
        toast.error(data.message);
      }

      if (data.variant === "success") {
        toast.success(data.message);
      }

      if (data.variant === "warning") {
        toast.error(data.message);
      }
    },
    []
  );
  useUser();

  const router = useRouter();
  const handleRoutes = useCallback((pathName: string) => {
    router.push(pathName);
  }, []);

  const { data: affiliateStats } = useQuery({
    queryKey: ["updateAffliateLinkClick", router?.query?.r],
    enabled: !!router?.query?.r,
    queryFn: () => {
      // console.log("router?.query?.r", router?.query?.r);

      if (router?.query?.r) {
        updateAffliateLinkClick({ affiliate_link: router?.query?.r as string });
      }
    }
  });

  useEventEmitter(events.showNotification, showNotifications);
  useEventEmitter(events.routerPush, handleRoutes);

  return null;
}
