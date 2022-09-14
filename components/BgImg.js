const BgImg = ({ children }) => {
  return (
    <div className="relative min-h-screen w-screen text-neutral-200">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/img/crypto.jpg"
      />
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-50" />
      <div className="relative py-8 px-12">{children}</div>
    </div>
  );
};

export default BgImg;
