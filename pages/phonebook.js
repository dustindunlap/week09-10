import { Container } from "@chakra-ui/react";
import AddPhonebook from "../components/AddPhonebook";
import PhonebookList from "../components/PhonebookList";
import Auth from "../components/Auth";

export default function Phonebook() {
    return (
        <Container maxW="container.xl" py="30vh" px="5">
        <Auth />
        <AddPhonebook />
        <PhonebookList />
        </Container>
    );
}