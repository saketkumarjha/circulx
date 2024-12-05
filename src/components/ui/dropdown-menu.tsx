// src/components/ui/dropdown-menu.tsx
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx"; // Optional: For utility class merging
import { Check, ChevronRight, Circle } from "lucide-react"; // Optional: Icons

type DropdownMenuProps = {
  children: React.ReactNode;
};

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>;
}

export function DropdownMenuTrigger({
  children,
  ...props
}: DropdownMenuPrimitive.DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger asChild {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
}

export function DropdownMenuContent({
  children,
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Content
      {...props}
      className={clsx(
        "min-w-[6rem] p-.5 bg-white border rounded shadow-lg",
        className
      )}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  );
}

export function DropdownMenuItem({
  children,
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      className={clsx(
        "flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-200",
        className
      )}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      {...props}
      className={clsx("h-px bg-blue-800", className)}
    />
  );
}

export function DropdownMenuCheckboxItem({
  children,
  ...props
}: DropdownMenuPrimitive.DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem {...props}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check size={16} />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}
