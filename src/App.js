import React, { useState, useEffect } from "react";
import mercadopago from "./mercadopago.js";

function App() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api/products/10953");
      const data = await response.json();
      setOrderData(data);
    };
    fetchData();
  }, []);

  if (!orderData) {
    return <div>Loading...</div>;
  }
  console.log("ACA ORDERDATA", orderData);

  //  const { description, total } = orderData;

  const formattedOrderData = {
    quantity : 1,
    description: orderData.nombre.toString(),
    price: orderData.precio,
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // fetch(`${process.env.REACT_APP_BACK}/pay/preference`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formattedOrderData),
    // });
    fetch(`${process.env.REACT_APP_BACK}/pay/create_preference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedOrderData),
    })
      .then(function (response) {
        console.log("RESPONSE", response);
        return response.json();
      })

      .then(function (preference) {
        createCheckoutButton(preference.id);
      })
      .catch(function () {
        alert("Unexpected error");
      });
  };

  // Create preference when click on checkout button
  const createCheckoutButton = (preferenceId) => {
    // Initialize the checkout
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#button-checkout", // Class name where the payment button will be displayed
        label: "Pay", // Change the payment button text (optional)
      },
    });
  };

  return (
    <div className="ContainerCart">
      <div className="botones_de_pago">
        <div className="BotonCheckout">
          <h2 className="h2">Detalle de tu Compra: </h2>
          <h2 className="h2"> ${orderData.precio}</h2>
          <h2 className="h2"> {orderData.nombre}</h2>
          <h2 className="h2"> {orderData.description}</h2>
          
          <img className= "imagen_producto" src={orderData.img} alt="Imagen de la compra" />

          <button className="ButtonCart" onClick={handleCheckout}>
            Checkout
          </button>
          <div id="button-checkout"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
