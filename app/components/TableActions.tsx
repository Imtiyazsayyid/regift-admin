"use client";
import DeleteConfirmation from "@/app/components/DeleteConfirmation";
import { ArrowRightIcon, EyeOpenIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import axios, { Axios, AxiosResponse } from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";

interface Props {
  id?: number;
  deleteFunction?: () => Promise<AxiosResponse>;
  removedItem: string;
  editModal?: ReactNode;
  deleteConfirmationDescription?: string;
  deleteConfirmationTitle?: string;
  hideEdit?: boolean;
  hideDelete?: boolean;
  fetchData: () => {};
}

const TableActions = ({
  id,
  deleteFunction,
  removedItem,
  fetchData,
  editModal,
  deleteConfirmationDescription,
  deleteConfirmationTitle,
  hideEdit = false,
  hideDelete = false,
}: Props) => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleDelete = async () => {
    try {
      if (deleteFunction) {
        const res = await deleteFunction();

        if (!res.data.status) {
          toast.error(res.data.message);
        } else {
          toast.success("Deleted Successfully");
        }

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex gap={"2"} className="shadow-sm w-fit p-2 rounded-full border" justify={"center"}>
      {id && (
        <Button variant="soft" color="blue" onClick={() => router.push(currentPath + "/view/" + id)} radius="full">
          <EyeOpenIcon />
        </Button>
      )}
      {id && !hideEdit && (
        <Button variant="soft" color="violet" onClick={() => router.push(currentPath + "/edit/" + id)} radius="full">
          <Pencil2Icon />
        </Button>
      )}
      {editModal}
      {deleteFunction && !hideDelete && (
        <DeleteConfirmation
          confirmDelete={handleDelete}
          removedItem={removedItem}
          title={deleteConfirmationTitle}
          desc={deleteConfirmationDescription}
        />
      )}
    </Flex>
  );
};

export default TableActions;
