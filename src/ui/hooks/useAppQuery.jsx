// src/ui/hooks/useAppQuery.js
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

/**
 * AOP Wrapper for GET Queries
 * - Error handling موحد
 * - Toast errors
 * - Disable retry by default (لتجنب تكرار الخطأ)
 * - Logging للـ dev
 */
export function useAppQuery(options) {
  const {
    queryKey,
    queryFn,
    enabled = true,
    onError,
    onSuccess,
    retry = false, // تعطيل retry افتراضياً
    ...rest
  } = options;

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    retry,
    ...rest,

    // AOP success
    onSuccess: (data) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[QUERY SUCCESS]", queryKey, data);
      }

      if (onSuccess) onSuccess(data);
    },

    // AOP error
    onError: (error) => {
      if (process.env.NODE_ENV === "development") {
        console.error("[QUERY ERROR]", queryKey, error);
      }

      // error normalized من httpClient
      const message =
        error?.message || error?.data?.message || "حدث خطأ أثناء جلب البيانات";

      toast.error(message);

      if (onError) onError(error);
    },
  });
}
