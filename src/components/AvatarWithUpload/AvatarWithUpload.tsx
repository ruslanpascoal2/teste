import {  Circle, Icon } from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "./AvatarWithUpload.module.scss";

interface AvatarWithUploadProps{
  children: JSX.Element
}

const AvatarWithUpload = ({children} : AvatarWithUploadProps) => {
  return (
    <div className={styles.avatarWithUpload}>
      {children}
      <Circle bg="primary" className={styles.badge}>
        <Icon style={{ color: "white" }} as={AiOutlineCamera} />
      </Circle>
    </div>
  );
};

export default AvatarWithUpload;
