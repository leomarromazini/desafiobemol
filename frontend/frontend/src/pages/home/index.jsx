import { Container, Tittle, MainImageContainer } from "./styles";
import homeMain from "../../assets/lotties/home_image.json";
import Lottie from "react-lottie";
const lottieOptions = {
  loop: true,

  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Home = () => {
  return (
    <>
      <Container>
        <Tittle>market</Tittle>
        <MainImageContainer className="mainImg">
          <Lottie options={{ ...lottieOptions, animationData: homeMain }} />
        </MainImageContainer>
      </Container>
    </>
  );
};

export default Home;
