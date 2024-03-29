import { Flex, Heading } from "@radix-ui/themes";
import Form from "../Form";
import Seperator from "@/app/components/Seperator";

const NewOrganisationPage = () => {
  return (
    <Flex
      className="w-full p-10 overflow-hidden overflow-y-auto"
      direction={"column"}
      gap={"5"}
      align={"center"}
    >
      <Heading align={"center"}>Add New Organisation</Heading>
      <Seperator />
      <Form />
    </Flex>
  );
};

export default NewOrganisationPage;
