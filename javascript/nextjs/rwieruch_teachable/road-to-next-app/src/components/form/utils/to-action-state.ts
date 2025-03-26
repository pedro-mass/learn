import { ZodError } from "zod";

export type ActionState = { message: string; payload?: FormData };

export const fromErrorToActionState = (error: unknown, formData?: FormData) => {
  if (error instanceof ZodError) {
    // if validation error with Zod, return first error message
    return {
      message: error.errors[0].message,
      payload: formData,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
    };
  }

  return {
    message: "An unknown error occurred",
    payload: formData,
  };
};
