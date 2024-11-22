import Collapsible from "../Collapsible";
import SellerRequest from "../SellerRequest";

export default function SellerRequests() {
  const requests = [
    {
      username: "seller01",
    },
    {
      username: "seller2",
    },
  ];

  return (
    <div className="bg-light p-3 rounded shadow-sm">
      <Collapsible
        title={
          <h2 className="h5 mb-0">
            Requests <span className="badge bg-primary">{requests.length}</span>
          </h2>
        }
        collapsed={false}
      >
        {requests.map((request, index) => (
          <div key={index} className="mb-3">
            <SellerRequest username={request.username} />
            {index < requests.length - 1 && <hr />}
          </div>
        ))}
      </Collapsible>
    </div>
  );
}
