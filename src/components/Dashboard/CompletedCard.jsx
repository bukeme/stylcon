// import CustomLink from "../Shared/CustomLink";
import { formatDate } from "../Shared/helpers/helpers";

const CompletedCard = ({ item }) => {
  return (
    <div className="rounded-xl bg-[#f9f9f9] md:h-[225px] flex flex-col md:justify-between gap-3 p-4 text-dark">
      <div className="flex items-center justify-between">
        <aside>
          <h4 className="text-3xl font-bold">#{item.id}</h4>
          <p className="text-sm flex gap-2 items-center mt-3 capitalize">
            {item.category}
            <span className="bg-[#E1FFD1] rounded-lg px-2 py-1">Completed</span>
          </p>
        </aside>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">
          {formatDate(item.updated_at || item.created_at)}
        </p>

        {/* <CustomLink
          url={`/dasboard/details/${item.id}`}
          className="bg-white py-[14px] px-4 rounded-[50px] text-dark"
        >
          View
        </CustomLink> */}
      </div>
    </div>
  );
};

export default CompletedCard;
