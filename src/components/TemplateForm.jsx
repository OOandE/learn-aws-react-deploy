import React, { useState } from "react";
import { Cards } from "./Cards.tsx";
import {
  isPlainArray,
  isPlainObject,
  splitCamelCaseToWords,
} from "../utils.ts";

export const TemplateForm = ({ template }) => {
  const [form, setForm] = useState(template);

  const handleValue = (key, value) => {
    const newForm = { ...form };

    Object.entries(newForm).map(([tempKey, tempValue]) => {
      if (key === tempKey) {
        tempValue[key] = value;
      }
      if (isPlainObject(tempValue)) {
        Object.entries(tempValue).map(([tempKeyKey, tempValueValue]) => {
          if (key === tempKeyKey) {
            tempValueValue[key] = value;
          }
          if (isPlainArray(tempValueValue)) {
            tempValueValue.map((value) => {
              Object.entries(value).map(([subSubKey, subSubValue]) => {
                if (key === subSubKey) {
                  subSubValue[key] = value;
                }
              });
            });
          }
        });
      }
    });

    setForm(newForm);
  };

  return (
    <>
      {Object.entries(form).map(([tempKey, tempValue]) => (
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
                            <div>{subKey}</div>
                          ) : (
                            <ul>
                              <li className="template__form-item">
                                <label className="template__details-item-name">
                                  {splitCamelCaseToWords(subKey)}{" "}
                                </label>
                                <input
                                  type="text"
                                  value={subValue}
                                  className="template__form-item-input"
                                  onChange={(e) =>
                                    handleValue(subKey, e.target.value)
                                  }
                                />
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
                            <li className="template__form-item" key={subSubKey}>
                              <label className="template__details-item-name">
                                {splitCamelCaseToWords(subSubKey)}{" "}
                              </label>
                              <input
                                type="text"
                                value={subSubValue}
                                className="template__form-item-input"
                                onChange={(e) =>
                                  handleValue(subSubKey, e.target.value)
                                }
                              />
                            </li>
                          )
                        )}
                      </ul>
                    ))}
                  </div>
                ) : (
                  <li className="template__form-item" key={tempKeyKey}>
                    <label className="template__details-item-name">
                      {splitCamelCaseToWords(tempKeyKey)}{" "}
                    </label>
                    <input
                      type="text"
                      value={tempValueValue}
                      className="template__form-item-input"
                      onChange={(e) => handleValue(tempKeyKey, e.target.value)}
                    />
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
