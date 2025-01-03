import React from 'react';
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  type: "category" | "subcategory";
}

const DeleteConfirmationModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
  type
}: DeleteConfirmationModalProps) => {
  const itemType = type === "category" ? "danh mục" : "danh mục con";

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <AlertDialogTitle className="text-lg font-semibold">
              Xác nhận xóa {itemType}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600">
            Hành động này không thể hoàn tác. {itemType.charAt(0).toUpperCase() + itemType.slice(1)} này và tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <div className="flex gap-3 justify-end w-full">
              <Button
                variant="outline"
                className="border-gray-200 rounded-xl hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Hủy bỏ
              </Button>

            <Button
              onClick={onConfirm}
              className="bg-red-500 rounded-xl hover:bg-red-600 text-white"
            >
              Xác nhận xóa
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationModal;