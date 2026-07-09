import React from "react";

const DefaultSectionHeader = ({
  title,
  heading,
  subHeading,
  align = "center",
  hideTitle,
}: DefaultSectionHeaderProps) => {
  const alignWrapper =
    align === "left"
      ? "items-start"
      : align === "right"
        ? "items-end"
        : "items-center";
  const alignText =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div className={`flex flex-col ${alignWrapper} gap-2`}>
      {!hideTitle && (
        <div className="bg-pri-text py-1 px-3 rounded-sm">
          <p className="uppercase text-[10px] font-medium text-pri-bg">
            {title}
          </p>
        </div>
      )}
      <h2 className={`${alignText}`}>{heading}</h2>

      <p className={`max-w-xl ${alignText}`}>{subHeading}</p>
    </div>
  );
};

export { DefaultSectionHeader };

interface DefaultSectionHeaderProps {
  title: string;
  heading: string | React.ReactNode;
  subHeading: string;
  align?: "center" | "left" | "right";
  hideTitle?: boolean;
}
