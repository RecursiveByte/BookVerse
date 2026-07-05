import React from "react";

interface AnnouncementProps {
  message: string;
  link?: string;
  linkText?: string;
}

const Announcement: React.FC<AnnouncementProps> = ({
  message,
  link,
  linkText,
}) => {
  return (
    <div className="mb-2 mt-20 lg:mt-0 max-w-3xl rounded-xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-3">
      <span className="font-semibold text-[hsl(var(--primary))]">
        NOTE:
      </span>{" "}
      {message}
      {link && linkText && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 font-medium text-[hsl(var(--primary))] hover:underline"
        >
          {linkText}
        </a>
      )}
    </div>
  );
};

export default Announcement;