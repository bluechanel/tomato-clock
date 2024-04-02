'use client'
import React from "react";
import { Button } from "@nextui-org/react";
import { MoonIcon } from "../icon/MoonIcon";
import { SunIcon } from "../icon/SunIcon";

const SwitchTheme = ({ isSelected, onClick }: { isSelected: boolean, onClick: () => void }) => {

  return (
    <Button isIconOnly color="default" onClick={onClick}>
      {isSelected ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}


export default SwitchTheme;
