import Collapsible from "../Collapsible";
import SellerRequest from "../SellerRequest";

export default function SellerRequets(props) {
  const requests = [
    {
      username: "seller01",
    },
    {
      username: "seller2",
    },
  ];

  return (
    <div>
      <Collapsible
        title={<h2>Requests ({requests.length})</h2>}
        collapsed={false}
      >
        {requests.map((request) => (
          <div>
            <SellerRequest username={request.username} />
            <hr />
          </div>
        ))}
      </Collapsible>
    </div>
  );
}
