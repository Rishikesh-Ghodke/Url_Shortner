import React, { useState } from "react";
import axios from 'axios';
import {
    Box,
    FormControl,
    Input,
    FormHelperText,
    FormErrorMessage,
    FormLabel,
    Button,
    Flex,
    useClipboard,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";
import styles from './InputForm.module.css';

export const InputForm = () => {
    const [input, setInput] = useState(
        {
            longUrl: ""
        }
    );
    const [url, setUrl] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { hasCopied, onCopy } = useClipboard(url);
    const clientBaseUrl = window.location.href;

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInput({ ...input, [id]: value });
        setIsError(false);
    };
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    const handleSubmit = () => {
        if (!input.longUrl) {
            setIsError(true);
            setUrl("Please add a URL");
            return;
        }
        setIsloading(true);
        console.log("Submitting to:", axios.defaults.baseURL);
        axios.post('/api/url/shorten', input).then(res => {
            if (res.data) {
                let data = res.data;
                let createUrl = clientBaseUrl + data.urlCode;
                setUrl(createUrl);
            }
            console.log("res", res);
            setIsloading(false);
        }).catch(error => {
            console.error("Full Error:", error);
            let errorMsg = error.response?.data?.error || "Network Error: Could not reach server";
            setUrl(errorMsg);
            setIsloading(false);
        });
    };

    return (
        <Box
            width={"40%"}
            margin={"auto"}
            boxShadow="dark-lg"
            p="6"
            rounded="2xl"
            bg="dark"
            className={styles.mainContainer} >
            <FormControl isInvalid={isError}>
                <FormLabel >Convert long URLs into shortened versions with a single click.</FormLabel>
                <Input
                    id="longUrl"
                    type="url"
                    value={input.longUrl}
                    placeholder="Paste here your long URL"
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                />
                {!isError ? (
                    <FormHelperText>Enter your Long Url</FormHelperText>
                ) : (
                    <FormErrorMessage>URL is required.</FormErrorMessage>
                )}
            </FormControl>

            <Button type="submit"
                colorScheme="blue"
                m={5}
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText='Submitting'
            >
                Submit
            </Button>
            {url && <Flex mb={2}>
                <Input value={url} isReadOnly placeholder="Short Url" />
                <Button onClick={onCopy} ml={2}>
                    {hasCopied ? "Copied" : "Copy"}
                </Button>
            </Flex>}
        </Box>
    );
};
