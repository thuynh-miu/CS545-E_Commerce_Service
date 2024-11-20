import { Link } from "react-router-dom";


export default function Pagination({ current, maximum, onSelectPage }) {
    const handleOnClick = (event) => {
        onSelectPage(event.target.value);
    }
    return (
        <ul className="pagination justify-content-center">
            <li className={"cursor-pointer page-link" + (current === 1 ? " disabled" : "")} value={current - 1} onClick={handleOnClick}>
                Previous
            </li>
            {
                [...Array(maximum).keys()].map(
                    index => <li className={"cursor-pointer page-link" + (index + 1 == current ? " active" : "")} value={index + 1} onClick={handleOnClick}>
                        {index + 1}
                    </li>
                )
            }
            <li className={"cursor-pointer page-link" + (current === maximum ? " disabled" : "")} value={current + 1} onClick={handleOnClick} >
                Next
            </li>
        </ul>
    )
}