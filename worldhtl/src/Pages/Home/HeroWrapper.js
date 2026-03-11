const HeroWrapper = ({ backgroundImage, children, height = "600px" }) => {
  return (
    <div
      className="hero-container loaded"
      style={{
        height,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="overlay-gradient"></div>

      <div className="bg-element element-1"></div>
      <div className="bg-element element-2"></div>

      <div className="hero-content">
        {children}
      </div>
    </div>
  );
};

export default HeroWrapper;
