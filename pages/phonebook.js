import { Container } from "@chakra-ui/react";
import AddPhonebook from "../components/AddPhonebook";
import PhonebookList from "../components/PhonebookList";
import Auth from "../components/Auth";

export default function Phonebook() {
    return (
        <Container maxW="7xl">
        <Auth />
        <AddPhonebook />
        <PhonebookList />
        </Container>
    );
}