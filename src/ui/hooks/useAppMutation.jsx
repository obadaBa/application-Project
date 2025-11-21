// src/ui/hooks/useAppMutation.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

/**
 * هوك عام لعمليات الـ mutation
 * - بيوحّد طريقة عرض الأخطاء (toast.error)
 * - بيدعم رسالة نجاح جاهزة لو بدك
 * - وبالسطر الأخير بيرجع نفس نتيجة useMutation العادية
 */
export function useAppMutation(options) {
  const {
    mutationFn,
    successMessage, // نص اختياري لرسالة نجاح جاهزة
    onSuccess,
    onError,
    ...rest
  } = options;

  return useMutation({
    mutationFn,
    ...rest,

    // Aspect: success handling
    onSuccess: (data, variables, context) => {
      if (successMessage) {
        toast.success(successMessage);
      }
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },

    // Aspect: error handling موحد
    onError: (error, variables, context) => {
      // هاد error جاي من httpClient غالباً (normalizedError)
      const message =
        error?.message ||
        error?.response?.data?.message ||
        "حدث خطأ غير متوقع، حاول مرة أخرى";

      toast.error(message);

      if (onError) {
        onError(error, variables, context);
      }
    },
  });
}
