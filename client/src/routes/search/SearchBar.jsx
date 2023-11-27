import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { METHOD, CATEGORY, INGREDIENT } from "../../constants/Constant.js";
import axios from "axios";

const SearchBar = ({ setCuisines }) => {
  const [method, setMethod] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredients] = useState("");

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };

  // 검색 버튼 클릭시 데이터 요청
  const handleSearchClick = (event) => {
    event.preventDefault();

    if (method || category || ingredient) {
      const filterUrl = `${process.env.REACT_APP_SERVER}/`;
      const queryParams = {
        method: method,
        category: category,
        ingredient: ingredient,
      };
      axios
        ?.get(filterUrl, { params: queryParams })
        ?.then((res) => {
          setCuisines(res.data);
        })
        .catch((error) => {
          console.error("불러오기 실패", error);
        });
    }
  };

  return (
    <>
      <div className="w-[336px] px-[25px] pt-[100px] h-screen max-h-screen bg-secondary/80">
        <form onSubmit={handleSearchClick}>
          <header className="mb-2 text-[24px] font-semibold text-primary/90">
            Method
          </header>
          <RadioGroup
            className="mb-4 h-[168px]"
            value={method}
            onChange={handleMethodChange}
          >
            {METHOD.map((method, idx) => (
              <FormControlLabel
                key={idx}
                value={method}
                control={<Radio color="success" />}
                label={method}
              />
            ))}
          </RadioGroup>
          <header className="mb-2 text-[24px] font-semibold text-primary/90">
            Category
          </header>
          <RadioGroup
            className="mb-2 h-[128px]"
            value={category}
            onChange={handleCategoryChange}
          >
            {CATEGORY.map((category, idx) => (
              <FormControlLabel
                key={idx}
                value={category}
                control={<Radio color="success" />}
                label={category}
              />
            ))}
          </RadioGroup>
          <header className="mb-2 text-[24px] font-semibold text-primary/90">
            Ingredient
          </header>
          <RadioGroup
            className="mb-2 h-[128px]"
            value={ingredient}
            onChange={handleIngredientsChange}
          >
            {INGREDIENT.map((ingredient, idx) => (
              <FormControlLabel
                key={idx}
                value={ingredient}
                control={<Radio color="success" />}
                label={ingredient}
              />
            ))}
          </RadioGroup>
        </form>
        <button>Search</button>
      </div>
    </>
  );
};

export default SearchBar;