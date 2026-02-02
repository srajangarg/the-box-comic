"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  link?: LinkData;
  image?: string;
  caption?: string;
}

interface ProcessedMessage extends MessageData {
  isFirst: boolean;
  isLast: boolean;
  timestamp: string | null;
}

interface ImageViewerProps {
  src: string;
  onClose: () => void;
}

interface SectionMarkerProps {
  time?: string | null;
  topic?: string;
}

interface LinkPreviewProps {
  link: LinkData;
}

interface MessageProps {
  text: string;
  isFirst: boolean;
  isLast: boolean;
  avatar: string;
  timestamp: string | null;
  topic?: string;
  link?: LinkData;
  image?: string;
  caption?: string;
  onImageClick?: (src: string) => void;
}

interface ChatProps {
  title: string;
  avatar: string;
  messages: MessageData[];
}

// Utilities
function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
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
      <Link key={match.index} href={match[2]} className="chat-link">
        {match[1]}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function getTouchDistance(t1: React.Touch, t2: React.Touch): number {
  return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
}

// Components
function ImageViewer({ src, onClose }: ImageViewerProps): React.ReactElement {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastDistance = useRef<number | null>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        lastDistance.current = getTouchDistance(e.touches[0], e.touches[1]);
      } else if (e.touches.length === 1 && scale > 1) {
        isDragging.current = true;
        lastPosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    },
    [scale]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && lastDistance.current !== null) {
        e.preventDefault();
        const newDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const delta = newDistance / lastDistance.current;
        setScale((s) => Math.min(Math.max(s * delta, 1), 5));
        lastDistance.current = newDistance;
      } else if (e.touches.length === 1 && isDragging.current && scale > 1) {
        e.preventDefault();
        const deltaX = e.touches[0].clientX - lastPosition.current.x;
        const deltaY = e.touches[0].clientY - lastPosition.current.y;
        setPosition((p) => ({ x: p.x + deltaX, y: p.y + deltaY }));
        lastPosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    },
    [scale]
  );

  const handleTouchEnd = useCallback(() => {
    lastDistance.current = null;
    isDragging.current = false;
    if (scale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }, [scale]);

  const handleClose = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    window.history.pushState({ imageViewer: true }, "");

    function handlePopState(): void {
      onClose();
    }

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        window.history.back();
      }
    }

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={scale === 1 ? handleClose : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white text-2xl"
        aria-label="Close"
      >
        {"\u00D7"}
      </button>
      <div
        className="w-full h-full flex items-center justify-center p-4"
        onDoubleClick={handleDoubleClick}
      >
        <Image
          src={src}
          alt=""
          width={1200}
          height={800}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging.current ? "none" : "transform 0.2s ease-out",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

function SectionMarker({ time, topic }: SectionMarkerProps): React.ReactElement {
  return (
    <div className="text-center my-6 mb-4 -ml-8">
      {time && (
        <div className="text-[11px] text-white/50 uppercase tracking-wide">
          {time}
        </div>
      )}
      {topic && (
        <div className="text-xs text-white/50 mt-1 italic">{topic}</div>
      )}
    </div>
  );
}

function LinkPreview({ link }: LinkPreviewProps): React.ReactElement {
  return (
    <div className="bg-[#2c2c2e] rounded-t rounded-b-[18px] overflow-hidden mt-0.5">
      <Link
        href={link.url}
        className="block px-3 py-2 pb-2.5 no-underline text-inherit"
      >
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
        <div className="text-[13px] text-white/70 leading-snug">{link.hook}</div>
      </Link>
    </div>
  );
}

function Avatar({
  src,
  visible,
}: {
  src: string;
  visible: boolean;
}): React.ReactElement {
  if (!visible) {
    return <div className="w-6 h-6 shrink-0" />;
  }

  return (
    <div className="w-6 h-6 rounded-full shrink-0 overflow-hidden">
      <Image
        src={src}
        alt=""
        width={24}
        height={24}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function Message({
  text,
  isFirst,
  isLast,
  avatar,
  timestamp,
  topic,
  link,
  image,
  caption,
  onImageClick,
}: MessageProps): React.ReactElement {
  const showMarker = timestamp || topic;
  const parsedText = parseTextWithLinks(text);

  const baseBubbleClass =
    "max-w-[300px] px-3.5 py-2 bg-[#3a3a3c] text-white text-[17px] leading-snug tracking-tight break-words rounded-[18px]";

  const bubbleClasses = classNames(
    baseBubbleClass,
    !isFirst && "rounded-tl-[6px]",
    !isLast && "rounded-bl-[6px]"
  );

  const rowClasses = classNames(
    "flex items-end gap-2 mb-0.5 -ml-8",
    isLast && "mb-4"
  );

  if (link) {
    return (
      <>
        {showMarker && <SectionMarker time={timestamp} topic={topic} />}
        <div className={rowClasses}>
          <Avatar src={avatar} visible={isLast} />
          <div className="max-w-[300px]">
            <div className={`${bubbleClasses} rounded-bl rounded-br`}>
              {parsedText}
            </div>
            <LinkPreview link={link} />
          </div>
        </div>
      </>
    );
  }

  if (image) {
    const hasText = text && text.trim().length > 0;
    const hasCaption = caption && caption.trim().length > 0;
    const parsedCaption = caption ? parseTextWithLinks(caption) : null;

    const textAboveClasses = classNames(
      "px-3.5 py-2 bg-[#3a3a3c] text-white text-[17px] leading-snug tracking-tight break-words",
      "rounded-t-[18px]",
      !isFirst && "rounded-tl-[6px]"
    );

    const imageButtonClasses = classNames(
      "block w-full text-left cursor-zoom-in max-h-[450px] overflow-hidden",
      !hasText && "rounded-t-[18px]",
      !hasText && !isFirst && "rounded-tl-[6px]",
      !hasCaption && "rounded-b-[18px]",
      !hasCaption && !isLast && "rounded-bl-[6px]"
    );

    const captionClasses =
      "text-right py-1.5 text-white/70 text-[14px] italic leading-snug tracking-tight break-words mt-px";

    return (
      <>
        {showMarker && <SectionMarker time={timestamp} topic={topic} />}
        <div className={rowClasses}>
          <Avatar src={avatar} visible={isLast} />
          <div className="max-w-[300px]">
            {hasText && <div className={textAboveClasses}>{parsedText}</div>}
            <button
              type="button"
              onClick={() => onImageClick?.(image)}
              className={imageButtonClasses}
            >
              <Image
                src={image}
                alt=""
                width={300}
                height={450}
                className="w-full h-auto"
              />
            </button>
            {hasCaption && <div className={captionClasses}>{parsedCaption}</div>}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {showMarker && <SectionMarker time={timestamp} topic={topic} />}
      <div className={rowClasses}>
        <Avatar src={avatar} visible={isLast} />
        <div className={bubbleClasses}>{parsedText}</div>
      </div>
    </>
  );
}

// Main Chat component
export function Chat({ title, avatar, messages }: ChatProps): React.ReactElement {
  const startTime = useMemo(() => new Date(), []);
  const [viewingImage, setViewingImage] = useState<string | null>(null);

  const SECONDS_PER_MESSAGE = 4;

  const processedMessages: ProcessedMessage[] = messages.map((msg, index) => {
    const prevMsg = messages[index - 1];
    const isFirst = !prevMsg || !!prevMsg.endGroup;
    const isLast = !!msg.endGroup || index === messages.length - 1;

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
          avatar={avatar}
          timestamp={msg.timestamp}
          topic={msg.topic}
          link={msg.link}
          image={msg.image}
          caption={msg.caption}
          onImageClick={setViewingImage}
        />
      ))}
      {viewingImage && (
        <ImageViewer src={viewingImage} onClose={() => setViewingImage(null)} />
      )}
    </div>
  );
}
