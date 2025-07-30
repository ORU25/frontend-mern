import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/event",
  },
];

const BUTTON_ITEMS = [
  {
    label: "Register",
    href: "/auth/register",
    variant: "bordered",
},
{
    label: "Login",
    href: "/auth/login",
    variant: "solid",
  },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/acara",
    icon: <FaFacebook/>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/@acara",
    icon: <FaInstagram/>,
  },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@acara",
    icon: <FaTiktok/>,
  },
  {
    label: "Twitter",
    href: "https://www.twitter.com/@acara",
    icon: <FaTwitter/>,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/@acara",
    icon: <FaYoutube/>,
  },

];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
