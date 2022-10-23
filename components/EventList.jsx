import {
    Badge,
    Button,
    Box,
    Heading,
    SimpleGrid,
    Text,
    Input,
    useToast,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deleteEvent, updateEvent } from "../api/eventapi";
    const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState("");
 
    useEffect(() => {
        if (!user) {
            setEvents([]);
            return;
            }
            const q = query(collection(db, "events"), where("user", "==", user.uid));
            onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
            });
            setEvents(ar);
            });
    }, [user]);
    const handleEventDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this event?")) {
    deleteEvent(id);
    toast({ title: "Event deleted successfully", status: "success" });
    }
    };
    const handleEventUpdate = async (id) => {
        const event = {
            id,
            name,
            date,
        };
        updateEvent(event);
        toast({
        title: `Event updated.`
    });
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {events &&
    events.map((event) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    key={event.id}
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
    p="1"
    onClick={() => handleEventDelete(event.id)}
    >
    <FaTrash />
    </Badge>
    <Input
        placeholder={event.eventName}
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb="1"
    />
    </Heading>
    <Input
        placeholder={event.date}
        value={date}
        onChange={(e) => setDate(e.target.value)}
    />
    <Button
    float="right"    
    opacity="0.8"
    disabled={name.length < 1 || date.length < 1}
    variantcolor="teal"
    variant="solid"
    onClick= {() => handleEventUpdate(event.id)}
    >
        Update
    </Button>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default EventList;