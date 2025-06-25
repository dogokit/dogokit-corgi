import { useEffect } from "react";
import { href, useNavigate } from "react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth-client";

export function useOneTap() {
  const navigate = useNavigate();

  useEffect(() => {
    authClient.oneTap({
      fetchOptions: {
        onSuccess: () => {
          navigate(href("/dashboard"));
        },
      },
      onPromptNotification: (notification) => {
        toast(
          "Prompt was dismissed or skipped. Consider displaying an alternative sign-in option.",
          notification
        );
      },
    });
  }, [navigate]);
}
