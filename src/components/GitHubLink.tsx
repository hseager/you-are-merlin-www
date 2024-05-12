import exampleImage from "../assets/github-mark-white.svg";

export const GitHubLink = () => {
  return (
    <a href="https://github.com/hseager/you-are-merlin" className="github-logo">
      <img src={exampleImage} alt="github link" width="40" height="40" />
    </a>
  );
};
