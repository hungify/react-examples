import Navigation from 'components/Navigation';
import MainLayout from 'layouts/MainLayout';
import QuizApp from 'pages/ QuizApp/QuizApp';
import AnimatedCountdown from 'pages/AnimatedCountdown';
import AnimatedNavigation from 'pages/AnimatedNavigation';
import AutoTextEffect from 'pages/AutoTextEffect';
import BackgroundBoxes from 'pages/BackgroundBoxes';
import BackgroundSlider from 'pages/BackgroundSlider';
import BlurryLoading from 'pages/BlurryLoading';
import ButtonRippleEffect from 'pages/ButtonRippleEffect';
import ContentPlaceholder from 'pages/ContentPlaceholder';
import CustomRangeSlider from 'pages/CustomRangeSlider';
import DadJokes from 'pages/DadJokes';
import DoubleClickHeart from 'pages/DoubleClickHeart';
import DoubleVerticalSlider from 'pages/DoubleVerticalSlider';
import DragNDrop from 'pages/DragNDrop';
import DrawingApp from 'pages/DrawingApp';
import DrinkWater from 'pages/DrinkWater';
import EventKeyCodes from 'pages/EventKeyCodes';
import ExpandingCards from 'pages/ExpandingCards';
import FAQCollapse from 'pages/FAQCollapse';
import FeedbackUIDesign from 'pages/FeedbackUIDesign';
import FormWave from 'pages/FormWave';
import GithubProfiles from 'pages/GithubProfiles';
import GoodCheapFast from 'pages/GoodCheapFast';
import HiddenSearch from 'pages/HiddenSearch';
import Home from 'pages/Home';
import Hoverboard from 'pages/Hoverboard';
import ImageCarousel from 'pages/ImageCarousel';
import IncrementCounter from 'pages/IncrementCounter';
import InsectCatchGame from 'pages/InsectCatchGame';
import KineticLoader from 'pages/KineticLoader';
import LiveUserFilter from 'pages/LiveUserFilter';
import MobileTabNavigation from 'pages/MobileTabNavigation';
import MovieApp from 'pages/MovieApp';
import NetflixMobileNavigation from 'pages/NetflixMobileNavigation';
import NotesApp from 'pages/NotesApp';
import PasswordGenerator from 'pages/PasswordGenerator';
import PasswordStrengthBackground from 'pages/PasswordStrengthBackground';
import Pokedex from 'pages/Pokedex';
import ProgressStep from 'pages/ProgressStep';
import RandomChoicePicker from 'pages/RandomChoicePicker';
import RandomImageFeed from 'pages/RandomImageFeed';
import RotatingNavigationAnimation from 'pages/RotatingNavigationAnimation';
import ScrollAnimation from 'pages/ScrollAnimation';
import SoundBoard from 'pages/SoundBoard';
import SplitLanding from 'pages/SplitLanding';
import StickyNavbar from 'pages/StickyNavbar/StickyNavbar';
import TestimonialBoxSwitcher from 'pages/TestimonialBoxSwitcher';
import ThemeClock from 'pages/ThemeClock';
import ToastNotification from 'pages/ToastNotification';
import TodoApp from 'pages/TodoApp';
import VerifyAccountUI from 'pages/VerifyAccountUI';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';

const lightTheme = {
  body: '#FFF',
  text: '#363537',
  background: '#363537',
};
const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  background: '#999',
};

function App() {
  const [theme, setTheme] = useState<'Light' | 'Dark'>('Light');

  const handleSwitchTheme = () => {
    setTheme(theme === 'Dark' ? 'Light' : 'Dark');
  };

  return (
    <ThemeProvider theme={theme === 'Light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Navigation />}>
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
            <Route path="good-cheap-fast" element={<GoodCheapFast />} />
            <Route path="animated-countdown" element={<AnimatedCountdown />} />
            <Route path="sound-board" element={<SoundBoard />} />
            <Route path="testimonial-box-switcher" element={<TestimonialBoxSwitcher />} />
            <Route path="live-user-filter" element={<LiveUserFilter />} />
            <Route path="notes-app" element={<NotesApp />} />
            <Route path="random-image-feed" element={<RandomImageFeed />} />
            <Route path="mobile-tab-navigation" element={<MobileTabNavigation />} />
            <Route path="verify-account-ui" element={<VerifyAccountUI />} />
            <Route path="hoverboard" element={<Hoverboard />} />
            <Route path="quiz-app" element={<QuizApp />} />
            <Route path="todo-list" element={<TodoApp />} />
            <Route path="feedback-ui-design" element={<FeedbackUIDesign />} />
            <Route path="netflix-mobile-navigation" element={<NetflixMobileNavigation />} />
            <Route path="password-strength-background" element={<PasswordStrengthBackground />} />
            <Route path="custom-range-slider" element={<CustomRangeSlider />} />
            <Route path="animated-navigation" element={<AnimatedNavigation />} />
            <Route path="pokedex" element={<Pokedex />} />
            <Route path="double-click-heart" element={<DoubleClickHeart />} />
            <Route path="3d-background-boxes" element={<BackgroundBoxes />} />
            <Route path="insect-catch-game" element={<InsectCatchGame />} />
            <Route path="rotating-navigation-animation" element={<RotatingNavigationAnimation />} />
            <Route
              path="theme-clock"
              element={<ThemeClock onSwitchTheme={handleSwitchTheme} theme={theme} />}
            />
          </Route>
          <Route
            path="*"
            element={
              <div>
                <h1>404</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

