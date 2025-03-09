import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: parseFloat(amount).toFixed(2),
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return actions.order
            .capture()
            .then(onSuccess)
            .catch((err) => {
              console.error("Capture Error:", err);
              alert(`Capture Error: ${err.message}`);
              onError(err);
            });
        }}
        onError={(err) => {
          console.error("PayPal Button Error:", err);
          alert(`PayPal Button Error: ${err.message}`);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

// import { useState } from "react";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// const PayPalButton = ({ amount, currency = "USD", onSuccess, onError }) => {
//   const [error, setError] = useState(null);

//   // PayPal initial options
//   const initialOptions = {
//     "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
//     currency: currency,
//     intent: "capture",
//   };

//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: amount,
//             currency_code: currency,
//           },
//         },
//       ],
//     });
//   };

//   const onApprove = (data, actions) => {
//     return actions.order.capture().then((details) => {
//       console.log("Transaction completed by", details.payer.name.given_name);
//       onSuccess(details);
//     });
//   };

//   const onErrorHandler = (err) => {
//     console.error("PayPal Error:", err);
//     setError(err);
//     onError?.(err);
//   };

//   return (
//     <div className="paypal-container">
//       {error && <div className="error-message">Error: {error.message}</div>}
//       <PayPalScriptProvider options={initialOptions}>
//         <PayPalButtons
//           style={{ layout: "vertical" }}
//           createOrder={createOrder}
//           onApprove={onApprove}
//           onError={onErrorHandler}
//           onCancel={() => console.log("Transaction cancelled")}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// };

// export default PayPalButton;
