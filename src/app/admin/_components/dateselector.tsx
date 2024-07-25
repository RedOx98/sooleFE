"use client";
import { BUS_OPERATIONAL_STATUS } from "@/lib/definitions";
import Search from "../../../../public/search.png";
import { Select } from "antd";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

import { ChangeEvent } from "react";

export default function DateSelector({ placeholder }: { placeholder: string }) {

  // Get page search params
  const searchParams = useSearchParams();

  // Get current base url
  // its a client component that can be used anywhere. We need to programatically get the current path name
  const pathname = usePathname();

  // To replace the current url
  const { replace } = useRouter();

  // Debounce handle search to reduce rate at which a function fires
  const handleSearch = useDebouncedCallback((term: string) => {
    // Create new url
    const params = new URLSearchParams(searchParams);

    // Set page to 1 when user types new search query
    params.set('page', '1');

    // set the query
    if (term) {
      params.set('query', term);
    }
    else {
      params.delete('query');
    }

    // Replace current url with generated new one
    replace(`${pathname}?${params.toString()}`)
  }, 600)


  // Fetch buses based on status
  const handleChange = (status: string) => {
    // Create new url
    const params = new URLSearchParams(searchParams);

    // // Set page to 1 when user types new search query
    // params.set('page', '1');

    // set the query
    if (status) {
      params.set('operationalStatus', status);
    }
    else {
      params.delete('operationalStatus');
    }

    // Replace current url with generated new one
    replace(`${pathname}?${params.toString()}`)
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="min-w-[200px]">
        <Select
          defaultValue="Select Status"
          style={{ width: "100%", height: 42, color: "#005A86" }}
          onChange={handleChange}
          options={[
            { value: "", label: "ALL" },
            { value: BUS_OPERATIONAL_STATUS.ACTIVE, label: BUS_OPERATIONAL_STATUS.ACTIVE },
            { value: BUS_OPERATIONAL_STATUS.INACTIVE, label: BUS_OPERATIONAL_STATUS.INACTIVE },
          ]}
        />
      </div>

      <input
        type="text"
        className="p-2 border-[1.4px] border-gray-300 rounded w-full max-w-lg focus:outline-none focus:border-ecobankBlue text-gray-500" placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('filter')?.toString()}
      />
    </div>
  );
}
