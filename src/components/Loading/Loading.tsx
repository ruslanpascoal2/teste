import { Box, Spinner } from "@chakra-ui/react";
import styles from "./Loading.module.scss";

interface LoadingProps {
  blockUi?: boolean;
}

const Loading = ({ blockUi = false }: LoadingProps) => {
  if (blockUi) {
    return (
      <Box
        h={"full"}
        w={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        className={styles.blockUi}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary"
          size="xl"
        ></Spinner>
      </Box>
    );
  }
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="primary"
      size="xl"
    ></Spinner>
  );
};

export default Loading;
