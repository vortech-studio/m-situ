import Link from "next/link";
import { HiHome, HiChevronRight } from "react-icons/hi";

export default function Breadcrumbs({ pages }) {
  return (
    <nav className="text-custom-black tracking-wide sm:flex">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <Link href={"/dashboard"} passHref>
              <HiHome className="h-6 w-6 flex-shrink-0 transition hover:text-primary" />
            </Link>
          </div>
        </li>
        {pages.map((page, i) => (
          <li
            key={i}
            className={`${pages.length == i + 2 ? "block" : "hidden sm:block"}`}
          >
            <div className="flex items-center gap-2">
              <HiChevronRight className="h-6 w-6 flex-shrink-0" />
              <Link
                href={page.href}
                className="text-xl font-bold transition hover:text-primary"
                passHref
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
