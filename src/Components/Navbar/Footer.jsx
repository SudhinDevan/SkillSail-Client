import Logo from "../Logo";

const Footer = () => {
  return (
    <div className="bg-gray-900 py-4 px-3 static bottom-0 left-0 w-full z-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Logo />
        </div>
        <div className="flex flex-wrap justify-center md:justify-end">
          <div className="p-2 md:p-3 text-white">
            <ul>
              <li>About</li>
              <li>About</li>
              <li>About</li>
              <li>About</li>
            </ul>
          </div>
          <div className="p-2 md:p-3 text-white">
            <ul>
              <li>About</li>
              <li>About</li>
              <li>About</li>
              <li>About</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
