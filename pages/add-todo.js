import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";

export default function AddToDo() {
return (
<Container maxW="container.xl" py="30vh" px="5">
<Auth />
<AddTodo />
</Container>
);
}