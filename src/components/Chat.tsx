"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Types
export interface LinkData {
  url: string;
  title: string;
  hook: string;
  image: string;
}

export interface MessageData {
  text: string;
  topic?: string;
  endGroup?: boolean;
  emoji?: boolean;
  link?: LinkData;
}

interface ProcessedMessage extends MessageData {
  isFirst: boolean;
  isLast: boolean;
  timestamp: string | null;
}

// Utilities
function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function parseTextWithLinks(text: string): React.ReactNode {
  if (!text) return text;

  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={match.index}
        href={match[2]}
        className="text-white no-underline border-b border-white/35 pb-px"
      >
        {match[1]}
        <span className="text-[11px] opacity-50 whitespace-nowrap">{'\u00A0↗'}</span>
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Components
function SectionMarker({ time, topic }: { time?: string | null; topic?: string }) {
  return (
    <div className="text-center my-6 mb-4 -ml-8">
      {time && (
        <div className="text-[11px] text-white/50 uppercase tracking-wide">
          {time}
        </div>
      )}
      {topic && (
        <div className="text-xs text-white/50 mt-1 italic">
          {topic}
        </div>
      )}
    </div>
  );
}

function LinkPreview({ link }: { link: LinkData }) {
  return (
    <div className="bg-[#2c2c2e] rounded-t rounded-b-[18px] overflow-hidden mt-0.5">
      <Link href={link.url} className="block px-3 py-2 pb-2.5 no-underline text-inherit">
        <div className="flex items-end gap-2 mb-1.5">
          <Image
            src={link.image}
            alt=""
            width={22}
            height={22}
            className="rounded-md object-cover shrink-0"
          />
          <div className="text-sm font-semibold text-white flex-1 truncate translate-y-0.5">
            {link.title}
          </div>
        </div>
        <div className="text-[13px] text-white/70 leading-snug">
          {link.hook}
        </div>
      </Link>
    </div>
  );
}

function Message({
  text,
  isFirst,
  isLast,
  isEmoji,
  avatar,
  timestamp,
  topic,
  link,
}: {
  text: string;
  isFirst: boolean;
  isLast: boolean;
  isEmoji?: boolean;
  avatar: string;
  timestamp: string | null;
  topic?: string;
  link?: LinkData;
}) {
  const bubbleClasses = [
    "max-w-[300px] px-3.5 py-2 bg-[#3a3a3c] text-white text-[17px] leading-snug tracking-tight break-words rounded-[18px]",
    !isFirst && "rounded-tl-[6px]",
    !isLast && "rounded-bl-[6px]",
    isEmoji && "bg-transparent text-5xl p-0 leading-tight",
  ]
    .filter(Boolean)
    .join(" ");

  const rowClasses = [
    "flex items-end gap-2 mb-0.5 -ml-8",
    isLast && "mb-4",
  ]
    .filter(Boolean)
    .join(" ");

  const showMarker = timestamp || topic;
  const parsedText = parseTextWithLinks(text);

  const avatarEl = isLast ? (
    <div className="w-6 h-6 rounded-full shrink-0 overflow-hidden">
      <Image src={avatar} alt="" width={24} height={24} className="w-full h-full object-cover" />
    </div>
  ) : (
    <div className="w-6 h-6 shrink-0" />
  );

  if (link) {
    return (
      <>
        {showMarker && <SectionMarker time={timestamp} topic={topic} />}
        <div className={rowClasses}>
          {avatarEl}
          <div className="max-w-[300px]">
            <div className={`${bubbleClasses} rounded-bl rounded-br`}>{parsedText}</div>
            <LinkPreview link={link} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {showMarker && <SectionMarker time={timestamp} topic={topic} />}
      <div className={rowClasses}>
        {avatarEl}
        <div className={bubbleClasses}>{parsedText}</div>
      </div>
    </>
  );
}

// Main Chat component
export function Chat({
  title,
  avatar,
  messages,
}: {
  title: string;
  avatar: string;
  messages: MessageData[];
}) {
  const startTime = useMemo(() => new Date(), []);
  const SECONDS_PER_MESSAGE = 4;

  const processedMessages: ProcessedMessage[] = messages.map((msg, index) => {
    const prevMsg = messages[index - 1];
    const isFirst = !prevMsg || prevMsg.endGroup;
    const isLast = msg.endGroup || index === messages.length - 1;

    let timestamp: string | null = null;
    if (msg.topic) {
      const secondsOffset = index * SECONDS_PER_MESSAGE;
      const msgTime = new Date(startTime.getTime() + secondsOffset * 1000);
      timestamp = formatTime(msgTime);
    }

    return { ...msg, isFirst, isLast, timestamp };
  });

  return (
    <div className="max-w-[430px] mx-auto p-4 pl-12 min-h-full">
      <div
        className="h-[30vh] flex items-center justify-center text-[52px] font-normal italic text-white/95 text-center leading-none mb-8 -ml-8 px-5"
        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
      >
        {title}
      </div>
      {processedMessages.map((msg, index) => (
        <Message
          key={index}
          text={msg.text}
          isFirst={msg.isFirst}
          isLast={msg.isLast}
          isEmoji={msg.emoji}
          avatar={avatar}
          timestamp={msg.timestamp}
          topic={msg.topic}
          link={msg.link}
        />
      ))}
    </div>
  );
}
