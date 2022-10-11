import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addPhonebook } from "../api/phonebookapi";
const AddPhonebook = () => {
const [name, setName] = React.useState("");
const [number, setNumber] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();

const handlePhonebookCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to add a contact",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const phonebook = {
name,
number,
userId: user.uid,
};
await addPhonebook(phonebook);
setIsLoading(false);
setName("");
setNumber("");
toast({ title: "Contact added successfully", status: "success" });
};


return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<Textarea
placeholder="Number"
value={number}
onChange={(e) => setNumber(e.target.value)}
/>
<Button
onClick={() => handlePhonebookCreate()}
disabled={name.length < 1 || number.length < 1 || isLoading}
variantColor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default addPhonebook;