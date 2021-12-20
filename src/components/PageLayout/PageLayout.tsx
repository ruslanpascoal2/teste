import { Box } from "@chakra-ui/react";
import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return <Box paddingX={['1rem']} className={styles.pageLayout}>{children}</Box>;
};

export default PageLayout;
