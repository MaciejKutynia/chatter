import { VscLoading } from "react-icons/vsc";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.root}>
      <VscLoading />
    </div>
  );
};

export default Loading;
