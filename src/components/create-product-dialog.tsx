// src\components\create-product-dialog.tsx
"use client";

import { useState } from "react";
// import { ImagePlus } from "lucide-react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  ICard } from "@/services/sanityApi";
// import { useRef } from "react";

interface EditProductDialogProps {
  product: ICard;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: ICard) => void;
  categoryDropdown: string[];
}

export function CreateProductDialog({
  product: initialProduct,
  open,
  onOpenChange,
  onSave,
  categoryDropdown,
}: EditProductDialogProps) {


  //--------------------------------------------------States
  const [product, setProduct] = useState<ICard>(initialProduct);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSave(product);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update product", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
          <p>Add a new product to your store. Click save when you&apos;re done.</p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            
           
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={product._id}
                  onChange={(e) =>
                    setProduct({ ...product, _id: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={product.pricePerDay}
                  onChange={(e) =>
                    setProduct({ ...product, pricePerDay : Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={product._type}
                  onValueChange={(value) =>
                    setProduct({ ...product, _type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryDropdown.map((category, index) => (
                      <SelectItem value={category} key={index}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={product.originalPrice}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      originalPrice: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transmission">transmission</Label>
              <Textarea
                id="transmission"
                value={product.transmission}
                onChange={(e) =>
                  setProduct({ ...product, transmission: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, ...props }: React.ComponentProps<"label">) {
  return (
    <label className="text-sm font-medium leading-none" {...props}>
      {children}
    </label>
  );
}
