
const hostname = process.env.REACT_APP_BACKEND_URL;

// export const getOrders = async () => {
//     return fetch(`${hostname}/api/v1/authenticate`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
// };

export const getInventories = async () => {
    const accessToken = localStorage.getItem('accessToken');
    return fetch(`${hostname}/api/v1/products/seller`, {
        headers: {
            "Content-Type": "application/json",
            "accessToken": accessToken
        },
    }).then((response) => response.json());
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${hostname}/api/v1/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accessToken: accessToken,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to update order status: ${errorDetails.message || "Unknown error"}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating order status:", error.message);
    throw error;
  }
};
