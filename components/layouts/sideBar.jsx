import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiExit } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { HiMenuAlt2, HiOutlineCog, HiOutlineUser, HiX } from "react-icons/hi";
import { getFormattedGMTOffset } from "../../lib/helpers";
import { navigationLinks } from "../../lib/links";
import { onAuthStateChanged } from "firebase/auth";
import { signOutUser } from "../../services/user";

export default function Sidebar(props) {
  const router = useRouter();
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  function SidebarLink({ link }) {
    const [isExpanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
      setExpanded(!isExpanded);
    };

    return (
      <div className="pr-8">
        <button
          onClick={() =>
            !link.children ? router.push(link.href) : handleToggleExpand()
          }
          className={`
          ${
            router.pathname === link.href
              ? `text-lipad-blue bg-gradient-to-r from-[#99BEBA] to-[#5BC18D]`
              : `hover:bg-white hover:bg-opacity-30`
          } group flex w-full items-center rounded-r-full bg-opacity-30 py-2 pl-12`}
        >
          <link.icon className="mr-4 h-6 w-6 flex-shrink-0 " />
          <p className="font-medium">{link.name}</p>
          {link.children && (
            <svg
              className={`${isExpanded ? `rotate-90` : ``}          
                ml-auto mr-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out`}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          )}
        </button>
        {isExpanded && link.children && (
          <div>
            {link.children.map((childLink) => (
              <Link key={childLink.name} href={childLink.href}>
                <button
                  onClick={() => {
                    router.push(childLink.href);
                  }}
                  className={`${
                    router.pathname === childLink.href
                      ? `text-lipad-blue bg-gradient-to-r from-[#99BEBA] to-[#5BC18D]`
                      : `hover:bg-white hover:bg-opacity-30`
                  } group my-2 flex w-full items-center rounded-r-full bg-opacity-30 py-2 pl-20`}
                >
                  <div
                    className={`${
                      router.pathname === childLink.href
                        ? `bg-lipad-blue`
                        : `bg-white`
                    } h-2 w-2 rounded-full`}
                  ></div>
                  <span className="ml-2">{childLink.name}</span>
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  function SideBarContent() {
    return (
      <div className="relative h-full bg-gradient-to-r from-[#25486E] to-[#239068]">
        <div className="absolute -right-12 top-2">
          <button
            type="button"
            className="ml-1  grid h-10 w-10 place-content-center rounded-full ring-2 ring-inset ring-white"
            onClick={onClose}
          >
            <HiX className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="w-80">
          <div className="text-white">
            <div className="mx-auto mt-8 h-auto w-1/2 rounded-md bg-white p-1">
              <div className="relative h-12 w-full">
                <Image
                  src="/images/logo.jpeg"
                  alt="Lipad Logo"
                  fill={true}
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
            <div className="mt-8 space-y-2">
              {navigationLinks
                .filter((e) => e.type === "")
                .map((link) => (
                  <SidebarLink key={link.name} link={link} />
                ))}
            </div>
            <div className="space-y-2">
              {navigationLinks
                .filter((e) => e.type === "admin")
                .map((link) => (
                  <SidebarLink key={link.name} link={link} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobile && (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <SideBarContent />
          </DrawerContent>
        </Drawer>
      )}
      <Flex height="100vh">
        {!isMobile && <SideBarContent />}
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 justify-between border-b bg-white ">
            <button
              type="button"
              className="border-gray-200 text-gray-500 border-r px-4 lg:hidden"
              onClick={onOpen}
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2 md:hidden">
              <ProfileMenu />
            </div>
            <div className="hidden flex-1 justify-between px-6 md:flex md:px-0">
              <div className="flex">
                <div className="flex items-center justify-center gap-2 border-l px-8">
                  <Time format="dddd" />
                  <Time format="LL" />
                </div>
                <div className="flex items-center gap-2 border-l px-8">
                  <Time format="HH:mm:ss" />
                  <span
                    suppressHydrationWarning
                    className="text-lipad-grey truncate font-medium"
                  >
                    GMT {getFormattedGMTOffset()}
                  </span>
                </div>
              </div>

              <div className="mr-8 flex">
                <div className="flex items-center border-l px-6">
                  <ProfileMenu />
                </div>
              </div>
            </div>
          </div>
          <main className="min-h-screen bg-[#F8F7FB]">{props.children}</main>
        </div>
      </Flex>
    </>
  );
}

function useUserSession(initialUser) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}

function ProfileMenu() {
  const router = useRouter();
  const links = [
    {
      name: "My Profile",
      icon: HiOutlineUser,
      href: "/profile",
      onClick: () => {},
    },
    {
      name: "Settings",
      icon: HiOutlineCog,
      href: "/settings",
      onClick: () => {},
    },
    {
      name: "Log Out",
      icon: BiExit,
      href: "/profile",
      onClick: () => {
        signOutUser();
      },
    },
  ];

  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={"/images/profile.png"}
              alt=""
              fill={true}
              className="object-cover"
            />
          </div>
          <span className="text-lipad-blue font-medium">Admin Msitu</span>
          <FaCaretDown className="text-lipad-blue h-6 w-6" />
        </div>
      </MenuButton>
      <MenuList padding={0} margin={2}>
        {links.map((link, i) => (
          <MenuItem
            key={i}
            _focus={{ bg: "" }}
            _hover={{ bg: "#E9F9EF" }}
            onClick={link.onClick}
          >
            <div className=" group flex w-full items-center whitespace-nowrap rounded-b-md px-2 py-1.5 font-medium transition">
              <link.icon className="text-lipad-grey mr-4 h-6 w-6 flex-shrink-0" />
              <p>{link.name}</p>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

function Time({ format }) {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    let time = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(time);
  }, []);

  return (
    <span
      className="text-custom-gray truncate font-medium"
      suppressHydrationWarning
    >
      {currentTime.format(format)}
    </span>
  );
}
