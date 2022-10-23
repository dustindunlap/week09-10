import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";

export default function Home() {
return (
<Container maxW="container.xl" py="30vh" px="5">
    <SimpleGrid direction={{base:'column-reverse', }}>
        <Auth />
        <TodoList />
    </SimpleGrid>
</Container>
);
}