"use client";

import { Avatar, Flex, Select, Table, Text, Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import AppTable from "../../components/Table";
import * as AdminServices from "../../Services/AdminServices";
import toast from "react-hot-toast";
import TableActions from "../../components/TableActions";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import { Organisation } from "../../interfaces/OrganisationInterface";
import SearchBar from "../../components/SearchBar";
import EntriesPerPage from "../../components/EntriesPerPage";
import ApprovalStatusBadge from "../../components/ApprovalStatusBadge";
import ApprovalStatusFilter from "../../components/ApprovalStatusFilter";
import { getEmptyOrValue } from "../../helpers/selectHelpers";
import { PlusIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";

const OrganisationsPage = () => {
  const tableTitles = [
    "#",
    "Logo",
    "Name",
    "Acronym",
    "Email",
    "Status",
    "Actions",
  ];
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const router = useRouter();
  const currentPath = usePathname();

  // loader
  const [isLoading, setLoading] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("all");

  const getAllOrganisations = async () => {
    setLoading(true);
    try {
      const res = await AdminServices.getAllOrganisations({
        searchText,
        approvalStatus: getEmptyOrValue(approvalStatus),
      });
      if (res.status) {
        setOrganisations(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch Organisations");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllOrganisations();
    setCurrentPage(0);
  }, [searchText, approvalStatus]);

  const {
    currentPage,
    currentItems: currentOrganisations,
    setCurrentPage,
    totalPages,
  } = usePagination(organisations, entriesPerPage);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <Flex
        className="min-h-20 border rounded-lg shadow-sm"
        p={"4"}
        align={"center"}
        justify={"between"}
      >
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          placeholder="Find an organisation"
        />
        <Flex align={"end"} gap={"2"}>
          <ApprovalStatusFilter
            approvalStatus={approvalStatus}
            setApprovalStatus={setApprovalStatus}
          />
          <EntriesPerPage
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
          <Button
            variant="surface"
            onClick={() => router.push(currentPath + "/new")}
          >
            <PlusIcon /> Add New
          </Button>
        </Flex>
      </Flex>
      <Flex
        className="h-full w-full rounded-lg shadow-lg border overflow-hidden"
        direction={"column"}
        justify={"between"}
        p={"4"}
      >
        <AppTable
          titles={tableTitles}
          items={organisations}
          isLoading={isLoading}
        >
          {currentOrganisations?.map((organisation, index) => (
            <Table.Row align={"center"} key={index}>
              <Table.Cell>
                {index + 1 + currentPage * entriesPerPage}
              </Table.Cell>
              <Table.Cell>
                <Avatar
                  size={"2"}
                  radius="full"
                  fallback={"?"}
                  src={organisation.logo || ""}
                />
              </Table.Cell>
              <Table.Cell>{organisation.name}</Table.Cell>
              <Table.Cell>{organisation.acronym}</Table.Cell>
              <Table.Cell>{organisation.email}</Table.Cell>
              <Table.Cell>
                <ApprovalStatusBadge status={organisation.approvalStatus} />
              </Table.Cell>

              <Table.Cell>
                <TableActions
                  id={organisation.id}
                  removedItem={`organisation "${organisation.name}"`}
                  deleteFunction={() =>
                    AdminServices.deleteOrganisation(organisation.id)
                  }
                  fetchData={getAllOrganisations}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </AppTable>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default OrganisationsPage;
