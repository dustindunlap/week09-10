import {
Badge,
Box,
Heading,
SimpleGrid,
Text,
useToast,
Input,
Button
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus, updateTodo } from "../api/todo";
const TodoList = () => {
const [todos, setTodos] = React.useState([]);
const {  user } = useAuth();
const toast = useToast();
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
/*const refreshData = () => {
if (!user) {
setTodos([]);
return;
}
const q = query(collection(db, "todo"), where("user", "==", user.uid));
onSnapshot(q, (querySnapchot) => {
let ar = [];
querySnapchot.docs.forEach((doc) => {
ar.push({ id: doc.id, ...doc.data() });
});
setTodos(ar);
});
};*/
useEffect(() => {
    if (!user) {
        setTodos([]);
        return;
        }
        const q = query(collection(db, "todo"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
        let ar = [];
        querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
        });
        setTodos(ar);
        });
}, [user]);
const handleTodoDelete = async (id) => {
if (confirm("Are you sure you wanna delete this todo?")) {
deleteTodo(id);
toast({ title: "Todo deleted successfully", status: "success" });
}
};
const handleToggle = async (id, status) => {
const newStatus = status == "completed" ? "pending" : "completed";
await toggleTodoStatus({ docId: id, status: newStatus });
toast({
title: `Todo marked ${newStatus}`,
status: newStatus == "completed" ? "success" : "warning",
});
};
const handleTodoUpdate = async (id) => {
    const todox = {
        id,
        title,
        description,
    };
    updateTodo(todox);
    toast({
    title: `Todo updated.`
});
};
return (
<Box mt={5}>
<SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
{todos &&
todos.map((todo) => (
<Box
p={3}
boxShadow="2xl"
shadow={"dark-lg"}
transition="0.2s"
_hover={{ boxShadow: "sm" }}
key={todo.id}
>
<Heading as="h3" fontSize={"xl"}>

<Badge
color="red.500"
bg="inherit"
transition={"0.2s"}
_hover={{
bg: "inherit",
transform: "scale(1.2)",

}}
float="right"
size="xs"
onClick={() => handleTodoDelete(todo.id)}
mb="1"
>
<FaTrash />
</Badge>
<Badge
color={todo.status == "pending" ? "gray.500" : "green.500"}
bg="inherit"
transition={"0.2s"}
_hover={{
bg: "inherit",
transform: "scale(1.2)",
}}
float="right"
size="xs"
onClick={() => handleToggle(todo.id, todo.status)}
>
{todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
</Badge>
<Badge
float="right"
opacity="0.8"
bg={todo.status == "pending" ? "yellow.500" : "green.500"}
>
{todo.status}
</Badge>
<Input
        placeholder={todo.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb="1"
    />
    </Heading>
    <Input
        placeholder={todo.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb="1"
    />
    <Button
    float="right"    
    opacity="0.8"
    disabled={title.length < 1 || description.length < 1}
    variantcolor="teal"
    variant="solid"
    onClick= {() => handleTodoUpdate(todo.id)}
    >
        Update
    </Button>
</Box>
))}
</SimpleGrid>
</Box>
);
};
export default TodoList;