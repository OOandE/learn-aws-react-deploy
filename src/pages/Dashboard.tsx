import React from "react";
import { Cards } from "../components/Cards.tsx";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <Cards classes="dashboard__item">
          <div>1</div>
        </Cards>
        <Cards classes="dashboard__item">
          <div>2</div>
        </Cards>
        <Cards classes="dashboard__item">
          <div>3</div>
        </Cards>
        <Cards classes="dashboard__item">
          <div>4</div>
        </Cards>
        <Cards classes="dashboard__item">
          <div>5</div>
        </Cards>
      </div>
    </>
  );
}
