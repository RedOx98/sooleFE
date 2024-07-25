/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-[3vh]">

      <img src="/not-found.svg" alt="Not found" />

      <Link href={"/"} className="bg-ecobankBlue rounded px-24 py-3 text-sm text-white focus:outline-none mt-14 mb-14">Return Home</Link>
    </div>
  )
}