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
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handlePhonebookCreate = async () => {
if (!isLoggedIn) {
toast({
name: "You must be logged in to add a contact",
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
status,
userId: user.uid,
};
await addPhonebook(phonebook);
setIsLoading(false);
setName("");
setNumber("");
setStatus("pending");
toast({ title: "Contact added successfully", status: "success" });
};
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<Textarea
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
<option
value={"pending"}
style={{ color: "yellow", fontWeight: "bold" }}
>
Pending ⌛
</option>
<option
value={"completed"}
style={{ color: "green", fontWeight: "bold" }}
>
Completed ✅
</option>
</Select>
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