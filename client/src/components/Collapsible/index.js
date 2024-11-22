import { ArrowDownOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Collapsible(props) {
  const { title, id, children, collapsed = false } = props;
  const [isShow, setIsShow] = useState(!collapsed);

  const toggle = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div className="mb-3">
      <button
        className="btn btn-light w-100 d-flex align-items-center p-3 rounded shadow-sm"
        onClick={toggle}
        aria-expanded={isShow}
        aria-controls={`${id}-collapsible-content`}
      >
        <span className="fw-bold">{title}</span>
        <span className="ms-auto">
          {isShow ? <ArrowDownOutlined /> : <ArrowRightOutlined />}
        </span>
      </button>
      {isShow && (
        <div
          id={`${id}-collapsible-content`}
          className="mt-2 p-3 bg-light rounded"
        >
          {children}
        </div>
      )}
    </div>
  );
}
