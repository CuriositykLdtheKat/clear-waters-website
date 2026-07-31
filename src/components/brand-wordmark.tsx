import icon from "@/assets/cwb-icon.jpg.asset.json";

export function BrandWordmark({
  size = "md",
  tagline = false,
  tone = "default",
}: {
  size?: "sm" | "md" | "lg";
  tagline?: boolean;
  tone?: "default" | "onDeep";
}) {
  const iconSize =
    size === "sm" ? "h-10 w-10" : size === "lg" ? "h-20 w-20" : "h-14 w-14";
  const nameSize =
    size === "sm" ? "text-lg" : size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-[1.7rem]";
  const subSize = size === "lg" ? "text-xs sm:text-sm" : "text-[0.55rem] sm:text-[0.62rem]";
  const nameColor = tone === "onDeep" ? "text-current" : "text-deep";
  const subColor = tone === "onDeep" ? "text-current opacity-75" : "text-primary";
  const ruleColor = tone === "onDeep" ? "bg-current opacity-40" : "bg-primary/40";

  return (
    <span className="flex items-center gap-3 sm:gap-4">
      <img
        src={icon.url}
        alt="Clear Waters Bookkeeping monogram"
        className={`${iconSize} shrink-0 rounded-full`}
        width={1000}
        height={1000}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold uppercase ${nameSize} ${nameColor}`}
          style={{ letterSpacing: "0.06em" }}
        >
          Clear Waters
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className={`h-px flex-1 ${ruleColor}`} />
          <span
            className={`font-semibold uppercase ${subSize} ${subColor}`}
            style={{ letterSpacing: "0.42em" }}
          >
            Bookkeeping
          </span>
          <span className={`h-px flex-1 ${ruleColor}`} />
        </span>
        {tagline ? (
          <span
            className={`mt-2 font-flowing ${size === "lg" ? "text-xl sm:text-2xl" : "text-base"} ${
              tone === "onDeep" ? "text-current opacity-90" : "text-primary"
            }`}
          >
            Navigating your finances so you can sail your business forward
          </span>
        ) : null}
      </span>
    </span>
  );
}