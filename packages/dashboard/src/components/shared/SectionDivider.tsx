const bars = [
  "w-[3px] h-8",
  "w-[2px] h-8",
  "w-[5px] h-8",
  "w-[2px] h-8",
  "w-[1px] h-8",
  "w-[4px] h-8",
  "w-[2px] h-8",
  "w-[6px] h-8",
  "w-[1px] h-8",
  "w-[3px] h-8",
  "w-[2px] h-8",
  "w-[5px] h-8",
  "w-[1px] h-8",
  "w-[3px] h-8",
  "w-[2px] h-8",
  "w-[4px] h-8",
];

const SectionDivider = () => {
  return (
    <div className="barcode-divider">
      {bars.map((bar, i) => (
        <div key={i} className={`${bar} bg-warp-black`} />
      ))}
    </div>
  );
};

export default SectionDivider;
