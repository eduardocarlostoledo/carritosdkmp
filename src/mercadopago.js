/* eslint-disable */
//public key
const mercadopago = new MercadoPago(`${process.env.REACT_APP_MERCADOPAGO}`, {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});

export default mercadopago;