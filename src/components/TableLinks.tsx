import { ICellRendererParams } from "ag-grid-community";
import React from "react";
import { Link } from "react-router-dom";

export function TableLink(params: ICellRendererParams) {
  const link = <Link to={"/users/" + params.data?.id}>{params.value}</Link>;
  return link;
}
