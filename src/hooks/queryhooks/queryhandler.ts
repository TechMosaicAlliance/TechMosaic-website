import { toast } from "sonner";

export function handleMutationSuccess(data: any) {
  toast.success(data?.message || "Submitted Successfully");
}
export function handleMutationError({
  error,
}: {
  error?: any;
  showToast?: boolean;
}) {
  //handle all other errors that throws 400 above
  // Handle both network errors and other errors here
  //   if (error?. && !error.response) {
  //     // Network error handling
  //     toast.error(error?.message);
  //   } else {
  //     // Other error handling
  //     const err = error?.response?.data as any;
  //     toast.error(err?.message || error?.message || error?.response?.status, {});
  //     // Perform any additional error handling for non-network errors
  //   }
  toast.error(error?.message || "Something went wrong");
  console.log(error?.message);
}
