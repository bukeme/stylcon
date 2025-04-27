const SizeLine = ({ size }) => {
  return (
    <div className="flex items-center gap-3">
      <p className="min-w-[26px] min-h-[26px] bg-dark text-white rounded-full flex items-center justify-center text-sm">
        {size.id}
      </p>
      <p className="min-w-[140px] w-[140px]">{size.description}</p>
      <div className="flex gap-2">
        {size.sizes.map((item, i) => (
          <p
            key={i}
            className={`w-[48px] h-[45px] border border-black/[8%] rounded-lg flex justify-center items-center`}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SizeLine;
