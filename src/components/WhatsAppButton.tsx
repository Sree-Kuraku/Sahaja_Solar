import { FaWhatsapp, FaPhone } from "react-icons/fa";

export default function WhatsAppButton() {
  const whatsappNumber = "918019604025";

  const message = `Hello Sahaja Solar,
I would like to know more about your solar services.
Please contact me.
Thank you.`;

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const makeCall = () => {
    window.location.href = `tel:+${whatsappNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">

      {/* Call Button */}
      <button
        onClick={makeCall}
        className="flex items-center gap-2 bg-[#22c55e] text-white px-5 py-3 rounded-full shadow-xl hover:bg-[#1ea34d] transition-all duration-300"
      >
        <FaPhone className="text-lg" />
        <span className="font-semibold">Call Us</span>
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </button>

    </div>
  );
}