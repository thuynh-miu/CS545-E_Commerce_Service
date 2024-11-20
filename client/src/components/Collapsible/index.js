import { ArrowDownOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";


export default function Collapsible(props) {
    const { title, id, children } = props;
    const [isShow, setIsShow] = useState(false);

    const toggle = () => {
        setIsShow(isShow => !isShow);
    }
    return (
        <div>
            <button className="btn btn-light w-100 d-flex" onClick={toggle}>
                <span>{title}</span>
                <span className="ms-auto">
                    {isShow ? <ArrowDownOutlined /> : <ArrowRightOutlined />}
                </span>
            </button>
            {
                isShow && <div id={`#${id}-collapsible-filter`}>
                    <div className="container">
                        {children}
                    </div>
                </div>
            }

        </div>
    )
}