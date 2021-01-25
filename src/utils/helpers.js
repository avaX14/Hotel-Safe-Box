import UpArrow from "../assets/icons/up-arrow.svg";
import DownArrow from "../assets/icons/down-arrow.svg";
import LeftArrow from "../assets/icons/left-arrow.svg";
import RightArrow from "../assets/icons/right-arrow.svg";

export const renderKeySubItem = (key) => {
  switch (key) {
    case 8:
      return (
        <img
          src={UpArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="up-arrow"
        />
      );
    case 4:
      return (
        <img
          src={LeftArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="left-arrow"
        />
      );
    case 6:
      return (
        <img
          src={RightArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="right-arrow"
        />
      );

    case 2:
      return (
        <img
          src={DownArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="down-arrow"
        />
      );
    case "*":
      return <span className="safe-box-key-subvalue">B</span>;
    case "L":
      return <span className="safe-box-key-subvalue">A</span>;

    default:
      break;
  }
};
