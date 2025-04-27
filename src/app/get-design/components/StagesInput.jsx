"use client";

const StagesInput = ({
  value,
  setValue,
  name,
  label,
  placeholder,
  isEditable = true,
}) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <label className="text-lg font-medium uppercase">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        className="focus:outline-none bg-transparent text-grey"
        readOnly={!isEditable}
      />
    </div>
  );
};

export default StagesInput;
