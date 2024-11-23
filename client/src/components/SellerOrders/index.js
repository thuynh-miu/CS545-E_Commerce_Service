import Orders from "../Orders";

export default function SellerOrders(props) {
  const orders = [
    {
      id: "200012291239038",
      status: "CREATED",
      created_date: new Date("2024-09-20"),
      updated_date: new Date("2024-09-21"),
      items: [
        {
          img_url:
            "https://i5.walmartimages.com/seo/Hanes-Men-s-and-Big-Men-s-EcoSmart-Fleece-Pullover-Hoodie-Sizes-S-5XL_12204a7e-8ebe-4cc1-810c-6b8ad5094659.5bec73b378bc035ce1f06ed5515e313f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
        },
      ],
      total: 14.45,
    },
    {
      id: "54896298617020560799",
      status: "Delivered",
      created_date: new Date("2024-09-20"),
      updated_date: new Date("2024-10-19"),
      items: [
        {
          img_url:
            "https://i5.walmartimages.com/seo/Prairie-Fresh-Natural-Fresh-Pork-Spareribs-Bone-in-4-0-5-5-lb-19g-Protein-per-4oz-Serving_84b77ca3-ee51-4fd2-b460-634a3007c791.b32b79e2cf1244d9a02570f47a32c959.jpeg?odnHeight=60&odnWidth=60&odnBg=FFFFFF",
        },
        {
          img_url:
            "https://i5.walmartimages.com/seo/Great-Value-Large-White-Eggs-12-Count_b6760ce4-ef2b-4ee7-9c54-1e573897ad73.0e934a9843adc83711b5c933c7777f52.jpeg?odnHeight=60&odnWidth=60&odnBg=FFFFFF",
        },
        {
          img_url:
            "https://i5.walmartimages.com/seo/Great-Value-White-Round-Top-Bread-20-oz_8e69fca6-dda1-47b1-959c-7ec4d84b0a58.8cae75bc1ffe9c3d1ece768c0e5447a2.jpeg?odnHeight=60&odnWidth=60&odnBg=FFFFFF",
        },
        {
          img_url:
            "https://i5.walmartimages.com/seo/Great-Value-Heavy-Duty-Scrub-Sponges-4-Count_4d736eed-5190-4569-85f9-41c6ad65e73b.bf88c195d6b0e822a3c09b8ed21baba5.jpeg?odnHeight=60&odnWidth=60&odnBg=FFFFFF",
        },
      ],
      total: 14.45,
    },
    {
      id: "75555761531878243150",
      status: "Delivered",
      created_date: new Date("2024-09-20"),
      updated_date: new Date("2024-09-18"),
      items: [
        {
          img_url:
            "https://i5.walmartimages.com/seo/Fresh-Green-Seedless-Grapes-2-25-lbs-Bag-Est_9b543e57-d12c-4b2f-af70-cbfc8166dce1.19eafb20170233f7df74f7a6c5ff5530.jpeg?odnHeight=60&odnWidth=60&odnBg=FFFFFF",
        },
      ],
      total: 14.45,
    },
  ];

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h4">Your Orders</h1>
        <p className="text-muted">Manage and view your recent orders</p>
      </div>
      <div className="bg-light p-4 rounded shadow-sm">
        <Orders orders={orders} />
      </div>
    </div>
  );
}
