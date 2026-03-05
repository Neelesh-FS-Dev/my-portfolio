import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX - 6 + "px";
        cursor.style.top = mouseY - 6 + "px";
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (follower) {
        follower.style.left = followerX - 18 + "px";
        follower.style.top = followerY - 18 + "px";
      }
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      if (cursor) cursor.style.transform = "scale(2)";
      if (follower) {
        follower.style.width = "60px";
        follower.style.height = "60px";
      }
    };
    const onMouseLeaveLink = () => {
      if (cursor) cursor.style.transform = "scale(1)";
      if (follower) {
        follower.style.width = "36px";
        follower.style.height = "36px";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    addLinkListeners();
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
