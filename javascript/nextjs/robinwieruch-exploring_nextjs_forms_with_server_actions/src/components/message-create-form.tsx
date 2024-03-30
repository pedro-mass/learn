"use client";

import { useFormStatus } from "react-dom";
import { createMessage } from "@/app/actions";

type SubmitButtonProps = {
  label: string;
  loading: React.ReactNode;
};

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="border-2">
      {pending ? loading : label}
    </button>
  );
};

const MessageCreateForm = () => {
  return (
    <form action={createMessage} className="flex flex-col gap-y-2">
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <SubmitButton label="Create" loading="Creating ..." />
    </form>
  );
};

export { MessageCreateForm };
