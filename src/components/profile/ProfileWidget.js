import { styles } from "../../styles";

export default function ProfileWidget({ domElement }) {
  const account = domElement.getAttribute("account");

  return (
    <div style={styles.ProfileWidget}>
      <span><b>Profile Widget</b></span>
      <br />
      <br />
      <span>Account: {account}</span>
    </div>
  );
}

