import 'tailwindcss/dist/base.css'
import 'tailwindcss/tailwind.css'
import './styles/globalStyles.css'
import React from 'react'
import { css } from 'styled-components/macro' //eslint-disable-line

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from './components/pages/MainPage'

/*
 * This is the entry point component of this project. You can change the below exported default App component to any of
 * the prebuilt landing page components by uncommenting their import and export lines respectively.
 * See one of the landing page components to better understand how to import and render different components (Always
 * make sure if you are building your own page, the root component should be the AnimationRevealPage component. You can
 * disable the animation by using the disabled prop.
 *
 * The App component below is using React router to render the landing page that you see on the live demo website
 * and the component previews.
 *
 */

/* Use AnimationRevealPage as a wrapper component for your pages if you are building a custom one yourself */
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";

/*
 * Hero section is the top most section on the page. It contains the header as well.
 * So you dont need to import headers
 * separately
 */

import ComponentRenderer from './ComponentRenderer.js'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TwoColWithFeaturesAndTestimonial from './components/hero/TwoColWithFeaturesAndTestimonial'
import DetailsPage from './components/pages/DetailsPage'
import Navbar from './components/partials/navigation/Navbar'
import TwoColFormWithIllustration from './components/forms/TwoColFormWithIllustration'
import TestForm from './components/forms/TestForm'
import OpportunitySubmissionForm from './components/forms/OpportunitySubmissionForm'

// allows toast notifications to be used
toast.configure()
export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;
  const numOfImages = 4
  return (
    <Router>
      <Switch>
        <Route path='/components/:type/:subtype/:name'>
          <ComponentRenderer />
        </Route>
        <Route path='/components/:type/:name'>
          <ComponentRenderer />
        </Route>

        <Route path='/submission/:type'>
          <TwoColFormWithIllustration />
        </Route>
        <Route path='/navigation'>
          <Navbar />
        </Route>
        <Route path='/test-form'>
          <OpportunitySubmissionForm />
        </Route>
        <Route path='/test-form-two'>
          <TestForm />
        </Route>

        <Route path='/opportunity/details/:slug'>
          <DetailsPage />
        </Route>
        <Route path='/'>
          <MainPage />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  )
}
