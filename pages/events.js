import { Container } from "@chakra-ui/react";
import AddEvent from "../components/AddEvent";
import EventList from "../components/EventList";
import Auth from "../components/Auth";

export default function Events() {
    return (
        <Container maxW="container.xl" py="30vh" px="5">
        <Auth />
        <AddEvent />
        <EventList />
        </Container>
    );
}