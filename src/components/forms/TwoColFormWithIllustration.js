import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line

import { useParams } from 'react-router'

import TextInput from '../../helpers/TextInput'
import Form from '../../helpers/Form'
import SubmissionHandler from '../../helpers/SubmissionHandler.js'
import Navbar from '../partials/navigation/Navbar'
import MinimalCenteredFooter from '../footers/MinimalCenteredFooter'

const Container = tw.div`relative`
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-3 md:py-5`
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`
const ImageColumn = tw(
  Column
)`md:w-5/12 hidden md:block flex-shrink-0 h-40 md:h-auto`
const TextColumn = styled(Column)((props) => [
  tw`mt-4 md:w-7/12 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-3 lg:mr-4 md:order-first`
    : tw`md:ml-3 lg:ml-4 md:order-last`,
])

const TextContent = tw.div`lg:py-2 text-center md:text-left`

const Subheading = tw.h2`text-center font-bold md:text-left`
const Heading = tw.h1`mt-1 tracking-wide font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`
const Description = tw.p`mt-1 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-blue-100`

// const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-blue-500`
// const Textarea = styled(Input).attrs({ as: 'textarea' })`
//   ${tw`h-24`}
// `
const FormStyled = tw.div`mt-2 md:mt-3 text-sm w-full flex flex-col mx-auto md:mx-0`

export default ({
  subheading = 'Contact Us',
  heading = (
    <>
      Dear <span tw='text-blue-500'>Frameless,</span>
      <wbr />
    </>
  ),
  description = 'We are all ears, what would you like to discuss?',

  textOnLeft = true,

  imageSrc = 'https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
}) => {
  const { type } = useParams()

  let inputFields = []

  switch (type) {
    case 'opportunity':
      inputFields = [
        {
          fieldId: 'user_email',
          fieldPlaceholder:
            'Ready to help others soar? Enter your email so we can reach out to you.',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'user_name',
          fieldPlaceholder:
            'Fueling jets: Drop your name below, and your title if you have one.',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'opportunity_company',
          fieldPlaceholder:
            'Firing up boosters: From an organization? What is it called?',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'opportunity_title',
          fieldPlaceholder:
            'Time to launch: What is the title of your opportunity? ',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'opportunity_type',
          fieldPlaceholder:
            'What type of opportunity is it? e.g., lecture, workshop ',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'opportunity_duration',
          fieldPlaceholder: 'How long does the opportunity last? ',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'opportunity_location',
          fieldPlaceholder:
            'Where is it located? e.g., Virtual or London, England',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'opportunity_url',
          fieldPlaceholder: 'Drop the url to your opportunity below ',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'opportunity_image_url',
          fieldPlaceholder:
            'What image would you like to use? - this should be a url link to the image',
          fieldType: 'input',
          fieldEmailSend: false,
        },
      ]
      break
    case 'contact':
      inputFields = [
        {
          fieldId: 'user_email',
          fieldPlaceholder:
            'Ready to soar? Enter your email so we can get back to faster than lightning.',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'user_name',
          fieldPlaceholder:
            'Fueling jets. Drop your name below, and your title if you have one.',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'user_organization',
          fieldPlaceholder:
            'Firing up boosters. From an organization? What is it called?',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'user_reason',
          fieldPlaceholder: 'Time to launch. Why are you reaching out to us? ',
          fieldType: 'input',
          fieldEmailSend: false,
        },
      ]
      break
    default:
      inputFields = [
        {
          fieldId: 'user_email',
          fieldPlaceholder:
            'Ready to soar? Enter your email so we can get back to faster than lightning.',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'user_name',
          fieldPlaceholder:
            'Fueling jets. Drop your name below, and your title if you have one.',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'user_organization',
          fieldPlaceholder:
            'Firing up boosters. From an organization? What is it called?',
          fieldType: 'input',
          fieldEmailSend: false,
        },
        {
          fieldId: 'user_reason',
          fieldPlaceholder: 'Time to launch. Why are you reaching out to us? ',
          fieldType: 'input',
          fieldEmailSend: false,
        },
      ]
      break
  }

  // this array contains the ids that will be passed to the submission handler, it is initially empty
  // but when the inputFields are mapped over below, then it is populated
  let fieldIds = []

  // allows the image to set by a prop in the component called imageSrc
  const Image = styled.div(() => [
    `background-image: url("${imageSrc}");`,
    tw`h-full bg-center bg-no-repeat bg-contain rounded`,
  ])

  return (
    <>
      <Container>
        <Navbar />
        <TwoColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              {description && <Description>{description}</Description>}{' '}
              <Form>
                <FormStyled>
                  {inputFields.map((inputField, index) => {
                    // this maps over all the inputfields provided by props and creates an input
                    // element for each one

                    // first the id and placeholder are extracted, as the fields are passed in as
                    // an array of objects, then the element is created
                    // the id is what the field actually is, the placeholder is the prompt given to
                    // the user, and the type determines whether it is an small input box or a large text area.
                    const {
                      fieldId,
                      fieldPlaceholder,
                      fieldType,
                      fieldEmailSend,
                    } = inputField
                    console.log(
                      'INPUTFIELD VALUES',
                      fieldId,
                      fieldPlaceholder,
                      fieldType
                    )
                    // this pushes the id's of all the fields to the array which the submission handler then uses
                    fieldIds.push(fieldId)

                    return (
                      <>
                        <TextInput
                          id={inputField.fieldId}
                          placeholder={fieldPlaceholder}
                          type={fieldType}
                          sendEmail={fieldEmailSend}
                        />
                        <hr />
                      </>
                    )
                  })}

                  <SubmissionHandler ids={fieldIds} />
                </FormStyled>
              </Form>
            </TextContent>
          </TextColumn>{' '}
          <ImageColumn>
            <Image />
          </ImageColumn>
        </TwoColumn>
        <MinimalCenteredFooter />
      </Container>
    </>
  )
}
