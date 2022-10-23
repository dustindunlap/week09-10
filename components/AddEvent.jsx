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
import { addEvent } from "../api/eventapi";
const AddEvent = () => {
const [name, setName] = React.useState("");
const [date, setDate] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();

const handleEventCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to add an event",
status: "error",
duration: 9000,
isClosable: true,
});
return; 
}
setIsLoading(true);
const event = {
name,
date,
userId: user.uid,
};
await addEvent(event);
setIsLoading(false);
setName("");
setDate("");
toast({ title: "Event added successfully", status: "success" });
};

return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Event Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<Textarea
placeholder="Event Date"
value={date}
onChange={(e) => setDate(e.target.value)}
/>
<Button
onClick={() => handleEventCreate()}
disabled={name.length < 1 || date.length < 1 || isLoading}
variantcolor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddEvent;