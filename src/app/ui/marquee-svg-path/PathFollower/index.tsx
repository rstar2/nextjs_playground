import "./index.css";

export default function PathFollower({ svgPath }: { svgPath: string }) {
  return (
    <div className="marquee-container-css">
      <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={svgPath} stroke="black" fill="none" />
      </svg>
      <div className="marquee-item" data-svg-path={svgPath} />
    </div>
  );
}
