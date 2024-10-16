"use client";

import { GanttChartSquare } from "lucide-react";
import Link from "next/link";

import { COLORS } from "@/constants/color.constants";

import { LogoutButton } from "./LogoutButton";
import { MenuItem } from "./MenuItem";
import { MENU } from "./menu.data";

export function Sidebar() {
	return (
		<aside className="border-r border-r-border h-full bg-sidebar flex flex-col justify-between">
			<div className="relative">
				<Link
					href="/todo-planner"
					className="flex items-center gap-2.5 p-layout border-b border-b-border"
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
					/>
					<span className="text-2xl font-bold relative">ToDo Planner</span>
					<LogoutButton />
				</Link>
				<div className="p-3 relative">
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
						/>
					))}
				</div>
			</div>
			<footer className="text-xs opacity-40 font-normal text-center p-layout">
				2024 &copy; With love from ToDo Planner. <br /> All rights reserved.
			</footer>
		</aside>
	);
}
