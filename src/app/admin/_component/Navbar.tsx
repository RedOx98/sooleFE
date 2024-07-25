/* eslint-disable @next/next/no-img-element */
"use client";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION, Session } from "@/lib/definitions";
import { LogoutUser } from "@/lib/actions";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: `${NAVIGATION.ADMIN}`, icon: "/dashboard.svg" },
  {
    name: "Staff Management",
    href: `${NAVIGATION.ADMIN_STMGT}`,
    icon: "/staff-management.svg",
  },
  {
    name: "Captain Management",
    href: `${NAVIGATION.ADMIN_CPMGT}`,
    icon: "/check-in-management.svg",
  },
  {
    name: "Route Management",
    href: `${NAVIGATION.ADMIN_RTMGT}`,
    icon: "/route-management.svg",
  },
  {
    name: "Bus Management",
    href: `${NAVIGATION.ADMIN_BSMGT}`,
    icon: "/bus-management.svg",
  },
  { name: "Report", href: `${NAVIGATION.ADMIN_REPORT}`, icon: "/report.svg" },
  // {
  //   name: "User Management",
  //   href: `${NAVIGATION.ADMIN_USMGT}`,
  //   icon: "/user-management.svg",
  // },
];

type NavBarProps = {
  session: Session | null
}

const Navbar: React.FC<NavBarProps> = ({ session }) => {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  return (
    <>
      {/* Side Navigation */}
      <div
        className={`fixed z-[999] w-full lg:w-max inset-0 bg-black/20 ml-[-1px] ${isOpen ? "left-0" : "-left-full"
          } lg:left-0`}
        onClick={() => setIsOpen(false)}
      >
        <div className={`w-[250px] bg-ecobankTeal text-white h-screen`}>
          <div className="p-1 flex flex-col justify-between h-full">
            <div className="p-3">
              <div className="flex justify-center">
                <p className="text-white text-[2.3rem] text-center border-b-[5px] border-b-ecobankGreen w-max font-Aladin-Regular leading-none mb-[8vh]">
                  Kiti
                </p>
              </div>

              {/* Navigation links */}
              <nav className="font-Gilroy-Regular">
                <ul className="space-y-5" onClick={toggleSidebar}>
                  {navigation.map((item) => (
                    <li key={item.name} className="flex items-center space-x-4">
                      <Link
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "text-white font-bold"
                            : "text-gray-400  hover:text-white hover:font-bold whitespace-nowrap transition-all duration-300",
                          "flex items-center space-x-4"
                        )}
                      >
                        <div className="w-6 h-6 flex justify-center items-center group-hover:text-white">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="mr-2 transition-colors duration-300 ease-in-out group-hover:fill-current hover:text-white group-hover:text-white"
                          />
                        </div>
                        <span className="group-hover:text-white">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Footer links */}
            <div className="space-y-[10vh] mb-[12vh] sm:mb-[5vh] p-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  LogoutUser();
                  router.push("/login");
                }}
                className="flex items-center space-x-2 group hover:text-white hover:font-bold transition-all duration-300"
              >
                <div className="w-6 h-6 flex justify-center items-center group-hover:text-white">
                  <img
                    src="/logout.svg"
                    alt="Log Out"
                    className="transition-colors duration-300 ease-in-out group-hover:fill-current group-hover:text-white"
                  />
                </div>
                <span className="text-gray-400 font-Gilroy-Regular group-hover:text-white">
                  Log Out
                </span>
              </button>
              <div className="text-center text-xs font-Gilroy-Regular">
                <span>From Team Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Navigation */}
      <div className="lg:hidden relative py-2 flex justify-between bg-ecobankTeal pr-5 z-[20]">
        <button onClick={() => setIsOpen(true)} className="inset-x-0 p-4">
          <img src="/sandwich.svg" alt="menu icon" />
        </button>

        <div className="flex flex-row text-center items-center space-x-[1vh] sm:space-x-[2.5vh]  whitespace-nowrap">
          <img src="/profile-icon.svg" alt="User Icon" className="h-[5vh]" />
          <p className="font-Gilroy-SemiBold text-white">{session?.firstName || "User"}</p>
        </div>
      </div>

      {/* Desktop top navigation */}
      <div className="hidden fixed top-0 lg:z-[99] lg:pl-[250px] lg:flex justify-between items-center p-4 h-[12vh] bg-ecobankTeal lg:bg-white w-full shadow-sm">
        <div className="hidden lg:flex items-center space-x-4">
          <img
            src="/logo-drk.png"
            alt="Ecobank Logo"
            className="w-[10vw] p-2 pr-[5.5vh] sm:pl-5"
          />
          <div></div>
        </div>
        <div className="flex items-center md:mr-[0] sm:mr-[1vh] w-64">
          <div className="flex flex-row text-center items-center space-x-[1vh] sm:space-x-[2.5vh] pl-[7vh] whitespace-nowrap">
            <img src="/profile-icon.svg" alt="User Icon" className="h-[5vh]" />
            <p className="text-gray-700 font-Gilroy-SemiBold">{session?.firstName || "User"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
