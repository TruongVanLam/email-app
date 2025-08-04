export default function Footer() {
  return (
    <footer className="bg-gray-500 text-white py-1">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} truongvanlam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
