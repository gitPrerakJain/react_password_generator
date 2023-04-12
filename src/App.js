import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CopyToClipboard, { copy } from "react-copy-to-clipboard";

function App() {
  const [isUpperChecked, setIsUpperChecked] = useState(true);
  const [isLowerChecked, setIsLowerChecked] = useState(true);
  const [isNumberChecked, setIsNumberChecked] = useState(true);
  const [isSymbolChecked, setIsSymbolChecked] = useState(true);
  const [length, setLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const toast = useToast();

  // useEffect(() =>{},[])

  const handleClick = function (
    isLowerChecked,
    isUpperChecked,
    isNumberChecked,
    isSymbolChecked,
    length
  ) {
    isLowerChecked = Number(isLowerChecked);
    isUpperChecked = Number(isUpperChecked);
    isNumberChecked = Number(isNumberChecked);
    isSymbolChecked = Number(isSymbolChecked);
    setGeneratedPassword(
      generatePassword(
        isUpperChecked,
        isLowerChecked,
        isNumberChecked,
        isSymbolChecked,
        length
      )
    );
  };
  function handleCopy() {
    return toast({
      description: "Copied Password to Clipboard",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  let randFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };
  function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = "";
    let typeCount = upper + lower + number + symbol;
    // console.log("typecount:", typeCount);

    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    console.log("typesArray: ", typesArray);
    for (let i = 0; i < length; i += typeCount) {
      // console.log("length: " , length)
      // console.log("typecount: " , typeCount)
      typesArray.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randFunc[funcName]();
        console.log("forEach executed ", i, "times");
      });
    }
    return generatedPassword;
  }
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
  function getRandomSymbol() {
    let symbols = "!@#$%^&*()_+-=";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  return (
    <Container className="App">
      <Box
        m={"0 auto"}
        w="100%"
        h="100vh"
        bgGradient="radial(red.200, red.400, blue.200)"
        border={"5px solid"}
        borderColor={"gray.200"}
        justifyContent={"center"}
        textAlign={"center"}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          letterSpacing={"1rem"}
          textAlign={"center"}
        >
          Let's Stay Safe
        </Text>
        <Box
          // border={"5px solid"}
          m="5px"
          borderRadius={"30px"}
          boxShadow={"2xl"}
          bg="white"
          rounded={"md"}
          p={"6"}
        >
          <FormControl display="flex" alignItems="center">
            <Switch
              id="uCase"
              isChecked={isUpperChecked}
              onChange={() => setIsUpperChecked(!isUpperChecked)}
            />
            <FormLabel htmlFor="uCase" m="1">
              Use Uppercase Letters
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Switch
              id="lCase"
              isChecked={isLowerChecked}
              onChange={() => setIsLowerChecked(!isLowerChecked)}
            />
            <FormLabel htmlFor="lCase" m="1">
              Use Lowercase Letters
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Switch
              id="nums"
              isChecked={isNumberChecked}
              onChange={() => setIsNumberChecked(!isNumberChecked)}
            />
            <FormLabel htmlFor="nums" m="1">
              Use Numbers
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Switch
              id="sym"
              isChecked={isSymbolChecked}
              onChange={() => setIsSymbolChecked(!isSymbolChecked)}
            />
            <FormLabel htmlFor="sym" m="1">
              Use Symbols
            </FormLabel>
          </FormControl>
        </Box>
        Set Password Length
        <Box
          w={"95%"}
          m={"auto"}
          border={"1px solid"}
          justifyContent={"center"}
          borderRadius={"5px"}
        >
          <Flex>
            <NumberInput
              maxW="100px"
              mr="2rem"
              min={4}
              max={20}
              value={length}
              onChange={(value) => setLength(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              flex="1"
              max={20}
              min={4}
              focusThumbOnChange={false}
              value={length}
              onChange={(value) => setLength(value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={length} />
            </Slider>
          </Flex>
        </Box>
        <Button
          colorScheme="blue"
          m={"10px"}
          onClick={() =>
            handleClick(
              isLowerChecked,
              isUpperChecked,
              isNumberChecked,
              isSymbolChecked,
              length
            )
          }
        >
          Generate Password
        </Button>
        <CopyToClipboard text={generatedPassword}>
          <Button colorScheme="blue" m={"10px"} onClick={handleCopy}>
            <CopyIcon />
          </Button>
        </CopyToClipboard>
        <Input
          m={"2rem 0"}
          padding={"2rem"}
          textAlign={"center"}
          fontSize={"3xl"}
          fontWeight={"extrabold"}
          readOnly
          id="password"
          contentEditable={"false"}
          userSelect={"false"}
          value={generatedPassword}
        ></Input>
      </Box>
    </Container>
  );
}

export default App;
