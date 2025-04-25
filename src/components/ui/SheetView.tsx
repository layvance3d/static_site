import React from 'react';
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface SheetViewProps extends React.ComponentProps<typeof SheetPrimitive.Root> {}

const SheetView: React.FC<SheetViewProps> = (props) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

export default SheetView;
