import { createMessage } from "@/app/actions";

const MessageCreateForm = () => {
  return (
    <form action={createMessage} className="flex flex-col gap-y-2">
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <button type="submit" className="border-2">
        Create
      </button>
    </form>
  );
};

export { MessageCreateForm };
