import { Link } from "react-router-dom";

const TableLink = (params, url) => {
  const link = (
    <Link to={url + (params.data?.staffId ?? params.data?.id)}>
      {params.value}
    </Link>
  );
  return link;
};

export default TableLink;
