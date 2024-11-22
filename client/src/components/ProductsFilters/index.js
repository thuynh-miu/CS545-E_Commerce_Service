import { ArrowDownOutlined } from "@ant-design/icons";
import Collapsible from "../Collapsible";
import { useSearchParams } from "react-router-dom";

export default function ProductsFilters(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = [
    {
      name: "Brand",
      key: "brand",
      value: "brand",
      options: [
        {
          key: "apple",
          value: "apple",
          name: "Apple",
        },
        {
          key: "samsung",
          value: "samsung",
          name: "Samsung",
        },
        {
          key: "dell",
          value: "dell",
          name: "Dell",
        },
        {
          key: "lenovo",
          value: "lenovo",
          name: "Lenovo",
        },
      ],
    },
    {
      name: "Color",
      key: "color",
      value: "color",
      options: [
        {
          key: "black",
          value: "black",
          name: "Black",
        },
        {
          key: "white",
          value: "white",
          name: "White",
        },
        {
          key: "red",
          value: "red",
          name: "Red",
        },
        {
          key: "blue",
          value: "blue",
          name: "Blue",
        },
        {
          key: "yellow",
          value: "yellow",
          name: "Yellow",
        },
        {
          key: "green",
          value: "Green",
          name: "Green",
        },
      ],
    },
    {
      name: "Price Range",
      key: "price_range",
      value: "price_range",
      options: [
        {
          key: "0..100",
          value: "0..100",
          name: "Less than $100",
        },
        {
          key: "100..300",
          value: "100..300",
          name: "From $100 to $300",
        },
        {
          key: "300..1000",
          value: "300..1000",
          name: "From $300 to $1000",
        },
        {
          key: "1000..9999999",
          value: "1000..9999999",
          name: "From $1000+",
        },
      ],
    },
  ];
  const setFilter = (filter, option, checked) => {
    if (filter === "price_range") {
      if (checked) {
        searchParams.set(filter, option);
      } else {
        searchParams.delete(filter);
      }
    } else {
      const existingValues = searchParams.get(filter)?.split(",") || [];
      let updatedValues;

      if (checked) {
        updatedValues = [...new Set([...existingValues, option])];
      } else {
        updatedValues = existingValues.filter((value) => value !== option);
      }

      if (updatedValues.length > 0) {
        searchParams.set(filter, updatedValues.join(","));
      } else {
        searchParams.delete(filter);
      }
    }

    const queryString = decodeURIComponent(searchParams.toString());
    setSearchParams(queryString);
  };


  return (
    <div className="d-flex flex-column">
      {filters.map((filter) => (
        <div className="mb-1" key={filter.key}>
          <Collapsible title={filter.name} id={filter.key}>
            {filter.options.map((option) => (
              <div
                key={option.key}
                className="form-check"
                id={`${filter.key}-filter-${option.key}-options`}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={
                    searchParams
                      .get(filter.value)
                      ?.split(",")
                      .includes(option.value) || false
                  }
                  id={`${filter.key}-filter-${option.key}-options-${option.key}`}
                  onChange={(e) =>
                    setFilter(filter.value, option.value, e.target.checked)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`${filter.key}-filter-${option.key}-options-${option.key}`}
                >
                  {option.name}
                </label>
              </div>
            ))}
          </Collapsible>
        </div>
      ))}
    </div>
  );
}
