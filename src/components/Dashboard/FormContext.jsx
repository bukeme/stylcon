import { createContext, useContext, useState } from "react";

const FormContext = createContext();

const generalNav = [
  "Fits",
  "Cloth type",
  "Colourways",
  "Neck label",
  "Care label",
  "Design",
  "Cloth Design",
  "Quantity",
  "Packaging",
  "Delivery",
];
const jerseyNav = [
  "Fits",
  "Cloth type",
  "Colourways",
  "Neck label",
  "Care label",
  "Design",
  "Quantity",
  "Packaging",
  "Delivery",
];
const pantsNav = [
  "Fits",
  "Cloth type",
  "Colourways",
  "Waistband label",
  "Care label",
  "Design",
  "Quantity",
  "Packaging",
  "Delivery",
];

const options = [
  {
    name: "Tshirt",
    img: "https://drive.google.com/file/d/14SMfBOk7bA5bK_isppEgUlMgjlnszf92/view?usp=drive_link",
    nav: generalNav,
  },
  {
    name: "Caps",
    img: "https://drive.google.com/file/d/1CsGuDgFjUppq8JMlxF1ytOHz4UylpLbO/view?usp=drive_link",
    nav: [
      "Type",
      "Colourways",
      "Cap label",
      "Design",
      "Quantity",
      "Packaging",
      "Delivery",
    ],
  },
  {
    name: "Hoodie",
    img: "https://drive.google.com/file/d/1yD0P-QfKaf7YwDUm0pIAufHsMk6DnnqX/view?usp=drive_link",
    nav: generalNav,
  },
  {
    name: "Sweatshirt",
    img: "https://drive.google.com/file/d/1PrI1EhAD1fD2R2Mq0cHiqGd-dJhqjhTQ/view?usp=drive_link",
    nav: generalNav,
  },
  {
    name: "Socks",
    img: "https://drive.google.com/file/d/1H-qIKxuFSkQcUaGbib0ZKHysRkf6rzm8/view?usp=drive_link",
    nav: ["Size", "Colourways", "Design", "Quantity", "Packaging", "Delivery"],
  },
  {
    name: "Zip Hoodie",
    img: "https://drive.google.com/file/d/1N8C44iO5qSQlvFKOPIDeGfq3jZkfrsW1/view?usp=drive_link",
    nav: generalNav,
  },
  {
    name: "Denim",
    img: "https://drive.google.com/file/d/1KqfJcKlSdpXRSuJ0zjufN8FcIzRsEElh/view?usp=drive_link",
    nav: [
      "Fits",
      "Cloth type",
      "Colourways",
      "Waistband label",
      "Care label",
      "Design",
      "Cloth Design",
      "Quantity",
      "Packaging",
      "Delivery",
    ],
  },
  {
    name: "Longsleeve",
    img: "https://drive.google.com/file/d/1rxuCbZ3XICSIgVXKpko5OrA8YmAQXY2w/view?usp=drive_link",
    nav: generalNav,
  },
  {
    name: "Tank Top",
    img: "https://drive.google.com/file/d/1KnjFYa65kUwt8ZnUFfH6ghrFAJkEDgD-/view?usp=drive_link",
    nav: generalNav,
  },
  {
    name: "Beanies",
    img: "https://drive.google.com/file/d/1kGPVMtPZdvG-Wj8hVwpQXEAiSowPo9vt/view?usp=drive_link",
    nav: [
      "Beanie Type",
      "Colourways",
      "Design",
      "Quantity",
      "Packaging",
      "Delivery",
    ],
  },
  {
    name: "Pants",
    img: "https://drive.google.com/file/d/1QBBQMPhLDeXIjdfRU5DxezMeCU3qjU4W/view?usp=drive_link",
    nav: pantsNav,
  },
  {
    name: "Jersey",
    img: "https://drive.google.com/file/d/1VKgSJQbDY_gs273OpANvseZXlAUDWckq/view?usp=drive_link",
    nav: jerseyNav,
  },
  {
    name: "Sweatpants",
    img: "https://drive.google.com/file/d/1rOrVN8yYXIxuG0X60ZnXHB11dXKz987_/view?usp=drive_link",
    nav: pantsNav,
  },
  {
    name: "Shorts",
    img: "https://drive.google.com/file/d/1HyB1VOETD59j7D-mwzfKKmWdvmlORS5G/view?usp=drive_link",
    nav: pantsNav,
  },
  {
    name: "Custom Request",
    img: "https://drive.google.com/file/d/1wXS2yrFBEvTAGMvcVxxhqA4QXyAjSmcK/view?usp=drive_link",
    nav: generalNav,
  },
];

export const FormProvider = ({ children }) => {
  const [activeOption, setActiveOption] = useState(null);
  const [makePacking, setMakePacking] = useState(true);
  const [packageStage, setPackageStage] = useState(1);

  const handleMakePacking = (val) => {
    setMakePacking(val);
  };
  const handlePackagingStage = (val) => {
    setPackageStage(val);
  };

  return (
    <FormContext.Provider
      value={{
        options,
        activeOption,
        setActiveOption,
        makePacking,
        setMakePacking,
        handleMakePacking,
        packageStage,
        handlePackagingStage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(FormContext);
};
