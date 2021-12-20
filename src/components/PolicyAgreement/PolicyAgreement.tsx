import { Box,  Heading, Stack, Text } from "@chakra-ui/react";
import ActionButton from "../ActionButton/ActionButton";
import Actions from "../Actions/Actions";
import PageLayout from "../PageLayout/PageLayout";
import styles from "./PoliciyAgreement.module.scss";

interface PolicyAgreementProps {
  title: string;
  text: string | React.ReactNode;
  action: (option: 'agreed' | 'not-agreed') => void;
}

const PolicyAgreement = ({ title, text, action }: PolicyAgreementProps) => {
  return (
    <PageLayout>
      <Box pb={20}>
        <Stack spacing={7}>
          <Heading pb={8} size="lg" fontWeight="500" color="primary">
            <Text textAlign="center">{title}</Text>
          </Heading>
          <Box className={styles.textContainer}>
            <div>{text}</div>
          </Box>
          <Actions>
            <ActionButton
              onClick={() => action("not-agreed")}
              variant="outline"
            >
              Não concordo
            </ActionButton>
            <ActionButton onClick={() => action("agreed")}>
              Concordo
            </ActionButton>
          </Actions>
        </Stack>
      </Box>
    </PageLayout>
  );
};

export default PolicyAgreement;
