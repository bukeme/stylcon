"use client";

const productsNav = ["TOPS", "BOTTOMS", "HEADWEAR"];
const packagingNav = ["ALL", "LABELS", "ACCESSORIES", "PACKAGING"];

const ProductsNav = ({
  mainNav,
  setMainNav,
  subNav,
  setSubNav,
  subNav2,
  setSubNav2,
}) => {
  return (
    <section className="contain pt-14 pb-10">
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 border border-[
#EBEBEB] rounded-2xl p-2"
      >
        {["Products", "Packaging"].map((nav, i) => (
          <button
            key={i}
            onClick={() => setMainNav(nav)}
            className={`text-lg py-3 rounded-2xl transition-all ease-linear duration-500 ${
              mainNav === nav ? "bg-[#EBEBEB]" : ""
            }`}
          >
            {nav}
          </button>
        ))}
      </div>
      <div className="flex gap-6 sm:gap-14 justify-center mt-10">
        {mainNav === "Products"
          ? productsNav.map((nav, i) => (
              <SubNav key={i} subNav={subNav} setSubNav={setSubNav} nav={nav} />
            ))
          : packagingNav.map((nav, i) => (
              <SubNav
                key={i}
                subNav={subNav2}
                setSubNav={setSubNav2}
                nav={nav}
              />
            ))}
      </div>
    </section>
  );
};

export default ProductsNav;

const SubNav = ({ subNav, setSubNav, nav }) => {
  return (
    <button
      onClick={() => setSubNav(nav)}
      className={`border-b-2 transition-all ease-linear duration-500 text-sm xl:text-base ${
        subNav === nav
          ? "text-dark font-bold border-dark"
          : "text-grey border-transparent"
      }`}
    >
      {nav}
    </button>
  );
};
