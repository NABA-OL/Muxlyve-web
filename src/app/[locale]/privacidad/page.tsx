// Desarrollado por BlacKraken Solutions
export const metadata = {
  title: "Política de Privacidad – Muxlyve",
};

export default function PrivacidadPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.7 }}>
      <h1>Política de Privacidad</h1>
      <p><strong>Última actualización:</strong> 2 de julio de 2026</p>

      <h2>1. Información que recopilamos</h2>
      <p>
        Muxlyve recopila únicamente la información necesaria para proveer el servicio:
      </p>
      <ul>
        <li>Dirección de correo electrónico (proporcionada al autenticarse con Google o al adquirir una licencia).</li>
        <li>Identificador de dispositivo, usado exclusivamente para gestionar activaciones de licencia.</li>
        <li>Información de pago procesada por Freemius; Muxlyve no almacena datos de tarjetas.</li>
      </ul>

      <h2>2. Uso de la información</h2>
      <p>Usamos tu información para:</p>
      <ul>
        <li>Activar y validar tu licencia de Muxlyve.</li>
        <li>Enviarte el correo de confirmación de compra.</li>
        <li>Gestionar soporte técnico cuando lo solicites.</li>
      </ul>

      <h2>3. Compartir información</h2>
      <p>
        No vendemos ni compartimos tu información personal con terceros, excepto con los proveedores necesarios para operar el servicio (Freemius para pagos, Neon para base de datos, Vercel para infraestructura).
      </p>

      <h2>4. Google OAuth</h2>
      <p>
        Si inicias sesión con Google, recibimos tu dirección de correo electrónico y nombre de perfil únicamente para identificarte dentro de la aplicación. No accedemos a ningún otro dato de tu cuenta de Google.
      </p>

      <h2>5. Retención de datos</h2>
      <p>
        Conservamos tus datos mientras tu licencia esté activa. Puedes solicitar la eliminación de tu información escribiéndonos a <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a>.
      </p>

      <h2>6. Seguridad</h2>
      <p>
        Las claves de licencia se almacenan cifradas (HMAC-SHA256). Usamos HTTPS en todas las comunicaciones.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Para cualquier consulta sobre privacidad: <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a>
      </p>
    </main>
  );
}
