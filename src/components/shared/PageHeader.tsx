import { cn } from "@/lib/utils";

export default function PageHeader({ header, className }: { header: string; className?: string }) {
  return <h1 className={cn("text-center text-lg font-bold uppercase md:text-3xl", className)}>{header}</h1>;
}
