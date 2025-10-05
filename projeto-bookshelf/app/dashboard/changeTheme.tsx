"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiSunLight, PiMoon, PiMonitorLight } from "react-icons/pi";

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeIcons: Record<"light" | "dark" | "system", ReactElement> = {
    light: <PiSunLight className="w-5 h-5" />, // ✅ ESTA LINHA ESTÁ FALTANDO NO SEU CÓDIGO
    dark: <PiMoon className="w-5 h-5" />,
    system: <PiMonitorLight className="w-5 h-5" />,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="h-8 w-8 py-1 px-3 text-xs"
        >
          <span suppressHydrationWarning>
            {mounted && theme
              ? themeIcons[theme as "light" | "dark" | "system"]
              : <PiSunLight className="w-5 h-5" />} 
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <PiSunLight className="w-4 mr-2" /> Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <PiMoon className="w-4 mr-2" /> Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <PiMonitorLight className="w-4 mr-2" /> Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}