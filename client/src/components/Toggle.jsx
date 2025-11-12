import { Button, Box, useColorMode } from "@chakra-ui/react";
import React from "react";

const Toggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box position="fixed" top="1rem" right="1rem">
            <Button size="md" onClick={() => toggleColorMode()} variant="ghost">
                {colorMode === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
            </Button>
        </Box>
    );
};

export default Toggle;