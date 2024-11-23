const hostname = process.env.REACT_APP_BACKEND_URL;

export const getOrdersHistory = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${hostname}/api/v1/orders/history`, {
            headers: {
                "Content-Type": "application/json",
                "accessToken": accessToken || "",
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch order history");
        }

        const data = await response.json();

        if (data && Array.isArray(data.content)) {
            return data.content.map((order) => ({
                id: order.id,
                buyer: order.buyer?.user?.username,
                seller: order.seller?.user?.username,
                status: order.status,
                orderDate: order.orderDate,
                items: order.items.map((item) => ({
                    productId: item.product?.id,
                    productName: item.product?.name,
                    quantity: item.quantity,
                    price: item.price,
                    imageUrl: item.product?.imageUrl,
                })),
                address: order.address,
                updateDate: order.updateDate,
            }));
        }
        throw new Error("Unexpected response structure");
    } catch (error) {
        console.error("Error fetching order history:", error.message);
        throw error;
    }
};


