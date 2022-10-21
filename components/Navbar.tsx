import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-slate-900 text-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-5">
        <div>
          <Link href="/">
            <h5 className="cursor-pointer">openvoid</h5>
          </Link>
        </div>

        <div className="flex space-x-5">
          <Link href="/login">
            <h5 className="cursor-pointer">log in</h5>
          </Link>
          <Link href="/signup">
            <h5 className="cursor-pointer">sign up</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
