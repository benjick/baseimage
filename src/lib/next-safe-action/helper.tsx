import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import type { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const onActionError: NonNullable<
  Parameters<typeof useAction>[1]
>["onError"] = ({ error }) => {
  console.error("onActionError", error);
  if (error.validationErrors) {
    toast.error("Something went wrong");
  } else if (error.serverError && typeof error.serverError === "string") {
    if (error.serverError === DEFAULT_SERVER_ERROR_MESSAGE) {
      toast.error("Something went wrong");
    } else {
      toast.error(error.serverError);
    }
  } else {
    toast.error("Something went wrong");
  }
};
