import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import styles from "../styles/Form.module.css";


function CommonDropdown({ options, selectedKeys, setSelectedKeys, initialState }) {
  const [localSelectedKeys, setLocalSelectedKeys] = useState(initialState);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className={`capitalize w-32 py-2 px-2 border rounded-xl bg-slate-50 text-gray-800`}>
          {[...localSelectedKeys].join("")}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
      className={`bg-slate-50 rounded-sm w-32 p-1 border-spacing-1`}
        aria-label="Dropdown example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={localSelectedKeys}
        onSelectionChange={(keys) => {
          setLocalSelectedKeys(keys);
          setSelectedKeys(keys);
        }}
      >
        {options.map((option) => (
          <DropdownItem key={option} className={`m-1 border-t-1`}>{option}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default CommonDropdown;
