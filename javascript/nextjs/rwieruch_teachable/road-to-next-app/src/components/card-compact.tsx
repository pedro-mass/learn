import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const CardCompact = (props: {
  title: string;
  description?: string;
  className?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        {props.description && (
          <CardDescription>{props.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{props.content}</CardContent>
      {props.footer && (
        <CardFooter className="flex justify-between">{props.footer}</CardFooter>
      )}
    </Card>
  );
};
