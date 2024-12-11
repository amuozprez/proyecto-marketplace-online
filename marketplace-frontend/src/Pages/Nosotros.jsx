import React from "react";

const Nosotros = () => {
  return (
    <div className="container-fluid nosotros">
      <h2 className="text-center my-4">Sobre Nosotros</h2>
      <p className="text-center-justify">
        Bienvenido a <strong>Marketplace Santiago</strong>, una plataforma dedicada a conectar
        compradores y vendedores en un espacio confiable y seguro. Nos enorgullecemos de ser
        una comunidad donde puedes encontrar productos únicos, artesanías, ropa, y mucho más.
      </p>
      <h3 className="my-3 text-center">Nuestra Misión</h3>
      <p className="text-center-justify">
        Facilitar el intercambio de productos de manera eficiente y segura, ofreciendo una
        experiencia amigable para todos nuestros usuarios.
      </p>
      <h3 className="my-3 text-center">Nuestros Valores</h3>
      <ul>
        <li><strong>Confianza:</strong> Proporcionamos un entorno seguro para todos.</li>
        <li><strong>Calidad:</strong> Productos verificados y vendedores confiables.</li>
        <li><strong>Comunidad:</strong> Fomentamos relaciones entre compradores y vendedores.</li>
      </ul>
      <h3 className="my-3 text-center">¿Por qué elegirnos?</h3>
      <p className="text-center-justify">
        En Marketplace Santiago, valoramos a nuestros usuarios y trabajamos continuamente para
        mejorar nuestra plataforma. Aquí encontrarás productos de calidad, precios competitivos
        y un servicio de atención al cliente excepcional.
      </p>
      <div className="contact-info">
        <h4 className="my-3 text-center">Contacto</h4>
        <p className="text-center">Dirección: Santiago de Chile, Región Metropolitana</p>
        <p className="text-center">Correo electrónico: contacto@marketplacesantiago.cl</p>
        <p className="text-center">Teléfono: +56 9 1234 5678</p>
      </div>
    </div>
  );
};

export default Nosotros;