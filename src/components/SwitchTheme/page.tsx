'use client'
import React from "react";
import { Button } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

const SwitchTheme = ({ isSelected, onClick }: { isSelected: boolean, onClick: () => void }) => {

  return (
    <Button isIconOnly color="default" onClick={onClick}>
      {isSelected ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}


export default SwitchTheme;
