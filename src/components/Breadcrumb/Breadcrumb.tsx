import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumItem {
  route: string;
  label: string;
}
interface BreadcrumbProps {
  items: BreadcrumItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
const {pathname} = useLocation();
  return (
    <ChakraBreadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {items.map((item,index) => (
        <BreadcrumbItem key={index} isCurrentPage={pathname === item.route.replace('/', "")}>
          <BreadcrumbLink as={Link} to={item.route}>
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;
