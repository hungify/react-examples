import MainLayout from 'layouts/MainLayout';
import BackgroundSlider from 'pages/BackgroundSlider';
import BlurryLoading from 'pages/BlurryLoading';
import ContentPlaceholder from 'pages/ContentPlaceholder';
import DadJokes from 'pages/DadJokes';
import DragNDrop from 'pages/DragNDrop';
import DrinkWater from 'pages/DrinkWater';
import EventKeyCodes from 'pages/EventKeyCodes';
import ExpandingCards from 'pages/ExpandingCards';
import FAQCollapse from 'pages/FAQCollapse';
import FormWave from 'pages/FormWave';
import GithubProfiles from 'pages/GithubProfiles';
import HiddenSearch from 'pages/HiddenSearch';
import Home from 'pages/Home';
import IncrementCounter from 'pages/IncrementCounter';
import KineticLoader from 'pages/KineticLoader';
import ProgressStep from 'pages/ProgressStep';
import ScrollAnimation from 'pages/ScrollAnimation';
import SplitLanding from 'pages/SplitLanding';
import StickyNavbar from 'pages/StickyNavbar/StickyNavbar';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
