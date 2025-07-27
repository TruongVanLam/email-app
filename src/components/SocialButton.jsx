export default function SocialButton({ icon, alt, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 border rounded-md hover:bg-gray-100 transition"
    >
      <img src={icon} alt={alt} className="max-w-5 max-h-5 object-cover" />
    </button>
  );
}
