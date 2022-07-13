import MainLayout from 'layouts/MainLayout';
import AutoTextEffect from 'pages/AutoTextEffect';
import BackgroundSlider from 'pages/BackgroundSlider';
import BlurryLoading from 'pages/BlurryLoading';
import ButtonRippleEffect from 'pages/ButtonRippleEffect';
import ContentPlaceholder from 'pages/ContentPlaceholder';
import DadJokes from 'pages/DadJokes';
import DoubleVerticalSlider from 'pages/DoubleVerticalSlider';
import DragNDrop from 'pages/DragNDrop';
import DrawingApp from 'pages/DrawingApp';
import DrinkWater from 'pages/DrinkWater';
import EventKeyCodes from 'pages/EventKeyCodes';
import ExpandingCards from 'pages/ExpandingCards';
import FAQCollapse from 'pages/FAQCollapse';
import FormWave from 'pages/FormWave';
import GithubProfiles from 'pages/GithubProfiles';
import GoodCheapFast from 'pages/GoodCheapFast';
import HiddenSearch from 'pages/HiddenSearch';
import Home from 'pages/Home';
import ImageCarousel from 'pages/ImageCarousel';
import IncrementCounter from 'pages/IncrementCounter';
import KineticLoader from 'pages/KineticLoader';
import MovieApp from 'pages/MovieApp';
import PasswordGenerator from 'pages/PasswordGenerator';
import ProgressStep from 'pages/ProgressStep';
import RandomChoicePicker from 'pages/RandomChoicePicker';
import ScrollAnimation from 'pages/ScrollAnimation';
import SplitLanding from 'pages/SplitLanding';
import StickyNavbar from 'pages/StickyNavbar/StickyNavbar';
import ToastNotification from 'pages/ToastNotification/ToastNotification';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route path="expanding-cards" element={<ExpandingCards />} />
        <Route path="progress-step" element={<ProgressStep />} />
        <Route path="hidden-search" element={<HiddenSearch />} />
        <Route path="blurry-loading" element={<BlurryLoading />} />
        <Route path="scroll-animation" element={<ScrollAnimation />} />
        <Route path="split-landing" element={<SplitLanding />} />
        <Route path="event-key-codes" element={<EventKeyCodes />} />
        <Route path="increment-counter" element={<IncrementCounter />} />
        <Route path="drag-n-drop" element={<DragNDrop />} />
        <Route path="faq-collapse" element={<FAQCollapse />} />
        <Route path="dad-jokes" element={<DadJokes />} />
        <Route path="form-wave" element={<FormWave />} />
        <Route path="content-placeholder" element={<ContentPlaceholder />} />
        <Route path="github-profiles" element={<GithubProfiles />} />
        <Route path="background-slider" element={<BackgroundSlider />} />
        <Route path="drink-water" element={<DrinkWater />} />
        <Route path="sticky-navbar" element={<StickyNavbar />} />
        <Route path="kinetic-loader" element={<KineticLoader />} />
        <Route path="button-ripple-effect" element={<ButtonRippleEffect />} />
        <Route path="image-carousel" element={<ImageCarousel />} />
        <Route path="double-vertical-slider" element={<DoubleVerticalSlider />} />
        <Route path="toast-notification" element={<ToastNotification />} />
        <Route path="auto-text-effect" element={<AutoTextEffect />} />
        <Route path="movie-app" element={<MovieApp />} />
        <Route path="drawing-app" element={<DrawingApp />} />
        <Route path="random-choice-picker" element={<RandomChoicePicker />} />
        <Route path="password-generator" element={<PasswordGenerator />} />
        <Route path="good-cheap-fast" element={<GoodCheapFast />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
