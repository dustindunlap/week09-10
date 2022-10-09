import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deletePhonebook, togglePhonebookStatus } from "../api/phonebookapi";
    const PhonebookList = () => {
    const [contacts, setContacts] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
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
            setContacts([]);
            return;
            }
            const q = query(collection(db, "phonebook"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setContacts(ar);
            });
    }, [user]);
    const handlePhonebookDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this contact?")) {
    deleteContact(id);
    toast({ title: "Contact deleted successfully", status: "success" });
    }
    };
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleContactStatus({ docId: id, status: newStatus });
    toast({
    title: `Contact marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    });
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {contacts &&
    contacts.map((contact) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    {contact.name}{" "}
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
    onClick={() => handlePhonebookDelete(contact.id)}
    >
    <FaTrash />
    </Badge>
    <Badge
    color={contact.status == "pending" ? "gray.500" : "green.500"}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleToggle(contact.id, contact.status)}
    >
    {contact.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    float="right"
    opacity="0.8"
    bg={contact.status == "pending" ? "yellow.500" : "green.500"}
    >
    {contact.status}
    </Badge>
    </Heading>
    <Text>{contact.number}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default PhonebookList;