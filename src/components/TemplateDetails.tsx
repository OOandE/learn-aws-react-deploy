import React from "react";
import { Cards } from "./Cards.tsx";
import {
  isPlainArray,
  isPlainObject,
  splitCamelCaseToWords,
} from "../utils.ts";
import noTextLogo from "../assets/images/no-text-logo.svg";

export const TemplateDetailsComp = ({ data }) => {
  return (
    <>
      {Object.entries(data).map(([tempKey, tempValue]) => (
        <Cards key={tempKey} classes="template__details-card">
          <h4 className="template__details-list--heading">
            {splitCamelCaseToWords(tempKey)}
          </h4>
          <ul className="template__details-list">
            {Object.entries(tempValue).map(([tempKeyKey, tempValueValue]) => (
              <div key={tempKeyKey}>
                {isPlainObject(tempValueValue) ? (
                  <div className="template__details-subitem">
                    <h4 className="template__details-list--subheading">
                      {splitCamelCaseToWords(tempKeyKey)}
                    </h4>
                    {Object.entries(tempValueValue).map(
                      ([subKey, subValue]) => (
                        <div key={subKey}>
                          {subValue instanceof Object &&
                          subValue !== undefined ? (
                            <div></div>
                          ) : (
                            <ul>
                              <li className="template__details-item">
                                <span className="template__details-item-name">
                                  {splitCamelCaseToWords(subKey)}:{" "}
                                </span>
                                <span className="template__details-item-value">
                                  {subValue}
                                </span>
                              </li>
                            </ul>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ) : isPlainArray(tempValueValue) ? (
                  <div className="template__details-subitem">
                    <h4 className="template__details-list--subheading">
                      {splitCamelCaseToWords(tempKeyKey)}
                    </h4>
                    {tempValueValue.map((value) => (
                      <ul key={value}>
                        {Object.entries(value).map(
                          ([subSubKey, subSubValue]) => (
                            <li
                              className="template__details-item"
                              key={subSubKey}
                            >
                              <span className="template__details-item-name">
                                {splitCamelCaseToWords(subSubKey)}:{" "}
                              </span>
                              <span className="template__details-item-value">
                                {subSubValue}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    ))}
                  </div>
                ) : (
                  <li className="template__details-item" key={tempKeyKey}>
                    <span className="template__details-item-name">
                      {splitCamelCaseToWords(tempKeyKey)}:{" "}
                    </span>
                    <span className="template__details-item-value">
                      {tempValueValue}
                    </span>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </Cards>
      ))}
    </>
  );
};
