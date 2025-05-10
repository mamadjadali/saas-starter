"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"
import { Notifications } from "./Notifications"

import { usePathname } from "next/navigation"
import { Logo } from "../../public/Logo"
import { DropdownUserProfile } from "./UserProfile"
import { Badge } from "../Badge"

function Navigation() {
  const pathname = usePathname()
  return (
    <div className="shadow-s sticky top-0 z-20 bg-white dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 pt-3">
        <div>
          <span className="sr-only">Doxset</span>
          <div className="flex flex-row gap-8 items-center">

          <Logo className="h-8" />
          <div className="">
          <Badge variant="success">Dr. Maryam Ranjbar</Badge>
          <span className="px-2">-</span>
          <Badge variant="default">Dermatologist</Badge>
          </div>
          </div>
        </div>
        <div className="flex h-[42px] flex-nowrap gap-1">
          <Notifications />
          <DropdownUserProfile />
        </div>
      </div>
      <TabNavigation className="mt-5">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6">
          {/* <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/support"}
          >
            <Link href="/support">Support</Link>
          </TabNavigationLink>
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/retention"}
          >
            <Link href="/retention">Retention</Link>
          </TabNavigationLink> */}
        </div>
      </TabNavigation>
    </div>
  )
}

export { Navigation }
