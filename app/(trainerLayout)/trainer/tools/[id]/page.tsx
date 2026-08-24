"use client";


import ToolDetails from "@/components/trainer-dashboard/tools/ToolDetails";
import { useParams } from "next/navigation";


export default function ToolDetailsPage() {

  const params = useParams();
  const id = params?.id as string;

  console.log(
    "[ToolDetailsPage] Tool ID:",
    id
  );

  return (
    <ToolDetails toolId={Number(id)} />
  );
}