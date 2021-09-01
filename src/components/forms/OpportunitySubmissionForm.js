import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { transformData } from './dataManipulation'
import Navbar from '../partials/navigation/Navbar'
import { Select } from 'antd'
// There will be multiple forms here, all with the same styling but different descriptions
// , the submission handler function, which will be used for these forms, will simply add all
// the responses to a single object.
// There will then be a button at the end of all the forms which posts this object to the backend

const PrimaryContainer = tw.form`p-2 mt-6`
const SectionContainer = tw.div``
const PrimaryMargin = tw.div`mt-4 sm:mt-0`
const ColumnLayout = tw.div`md:grid md:grid-cols-3 md:gap-2`
const SingleColumn = tw.div`md:col-span-1`
const RowContainer = tw.div`flex w-full mt-0.125 rounded-md shadow-sm`
const PrimaryInformationContainer = tw.div`px-1 sm:px-0`
const PrimaryText = tw.h3`text-lg font-medium leading-6 text-gray-900`
const SecondaryText = tw.p`mt-0.125 text-sm text-gray-600`
const TertiaryText = tw.div`mt-0.5 text-sm text-gray-500`
const DoubleColumn = tw.div`mt-1 md:mt-0 md:col-span-2`
const SectionShadow = tw.div`shadow sm:rounded-md sm:overflow-hidden`
const PrimaryFormContainer = tw.div`px-1 py-1 space-y-2 bg-white sm:p-2`
const ThreeColGrid = tw.div`grid grid-cols-3 gap-2`
const ThreeColumn = tw.div`col-span-3 col-span-2`
const FormFooterContainer = tw.div`px-1 py-0.5 mt-0.5 text-right bg-gray-50 sm:px-2`
const SixColGrid = tw.div`grid grid-cols-6 gap-2`
const ThreeToTwoColumn = tw.div`col-span-3 sm:col-span-2`
const ThreeToSixColumn = tw.div`col-span-6 sm:col-span-3`
const SixColumn = tw.div`col-span-6`
const FourToSixColumn = tw.div`col-span-6 sm:col-span-4`
const SixToThreeToTwoColumn = tw.div`col-span-6 sm:col-span-3 lg:col-span-2`
const SixToSixToTwoColumn = tw.div`col-span-6 sm:col-span-6 lg:col-span-2`
const PrimaryInput = tw.input`block w-full mt-0.125 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`
const SecondaryInput = tw.input`flex-1 block w-full border  border-gray-300  rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm`
const PrimaryTextArea = tw.textarea`block w-full mt-0.125 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`
const PrimarySelect = tw.select`block w-full px-1 py-0.5 mt-0.125 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`
const Label = tw.label`block text-sm font-medium text-gray-700`
const PrimaryButton = tw.button`inline-flex justify-center px-2 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
const SubmitButton = tw.input`inline-flex justify-center px-2 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
const Highlight = tw.span`inline-flex items-center px-1 text-sm text-gray-500 border-b border-r-0 border-gray-300 rounded-l-md bg-gray-50`
const HiddenBlock = tw.div`hidden sm:block`
const YPadding = tw.div`py-1`
const TopBorder = tw.div`border-t border-gray-200`
const TopMargin = tw.div`mt-0.125`
const FeaturesInputContainer = tw.div`flex flex-col   gap-2`
const FeatureInputContainer = tw.div`flex flex-col gap-0.5`
const Separator = tw.hr`border  border-dashed`
const ErrorMessage = tw.p`text-xs font-semibold text-red-900`

const OpportunitySubmissionForm = () => {
  const [categories, setCategories] = useState([])
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  let history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const { Option } = Select

  const convertArrayOfObjectToArrayOfObjectValues = (array) => {
    const convertedArray = array.map((object) => {
      return Object.values(object)[0]
    })
    return convertedArray
  }

  const fetchCategories = () => {
    const fetchResponse = async () => {
      console.log(
        `https://frameless-backend-production.herokuapp.com/api/search/category/`
      )
      try {
        const res = await axios.get(
          `https://frameless-backend-production.herokuapp.com/api/search/category/`
        )
        console.log('this is the results', res.data)
        const rawCategories = res.data
        const refinedCategories =
          convertArrayOfObjectToArrayOfObjectValues(rawCategories)
        setCategories(refinedCategories)

        return refinedCategories
      } catch (error) {
        console.log('there was an error', error)
        return error
      }
    }
    fetchResponse()
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const postToBackend = (data) => {
    axios({
      method: 'post',
      url: 'https://frameless-backend-production.herokuapp.com/api/search/opportunity/',
      data: data,
    }).then((res) => {
      setResponse(res.data)
      console.log(res.data)
    })
    toast(' Your opportunity is now live!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    history.push('/')
  }

  const onSubmit = (data) => {
    event.preventDefault()
    const dataToSend = transformData(data)
    console.log('the data being sent', dataToSend)
    postToBackend(dataToSend)
    console.log('the form state errors', errors)
  }

  return (
    <>
      <Navbar />
      <PrimaryContainer onSubmit={handleSubmit(onSubmit)}>
        {/* Form section one */}
        <SectionContainer>
          <ColumnLayout>
            <SingleColumn>
              <PrimaryInformationContainer>
                <PrimaryText>Opportunity Information</PrimaryText>
                <SecondaryText>
                  This helps us categorize opportunities
                </SecondaryText>
              </PrimaryInformationContainer>
            </SingleColumn>
            <DoubleColumn>
              <SectionShadow>
                <PrimaryFormContainer>
                  <SixColGrid>
                    <ThreeToSixColumn>
                      <Label htmlFor='first-name'>Organization Name</Label>

                      <PrimaryInput
                        {...register('company', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors.company && (
                        <ErrorMessage>{errors.company.message}</ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <ThreeToSixColumn>
                      <Label htmlFor='last-name'>Opportunity Name</Label>

                      <PrimaryInput
                        {...register('title', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors.title && (
                        <ErrorMessage>{errors.title.message}</ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <ThreeToSixColumn>
                      {/* <label>Category One</label>
                      <Controller
                        control={control}
                        name='category-one'
                        render={({ field }) => (
                          <Select {...field} defaultValue='lucy'>
                            {categories.map((category) => {
                              return (
                                <Option value={category}>{category}</Option>
                              )
                            })}
                          </Select>
                        )}
                      />
                      <label>Category Two</label>
                      <Controller
                        control={control}
                        name='category-two'
                        render={({ field }) => (
                          <Select {...field} defaultValue='Technology'>
                            {categories.map((category) => {
                              return (
                                <Option value={category}>{category}</Option>
                              )
                            })}
                          </Select>
                        )}
                      />
                      <label>Category Three</label>
                      <Controller
                        control={control}
                        name='category-three'
                        render={({ field }) => (
                          <Select {...field} defaultValue='Technology'>
                            {categories.map((category) => {
                              return (
                                <Option value={category}>{category}</Option>
                              )
                            })}
                          </Select>
                        )}
                      />
                      {errors.title && (
                        <ErrorMessage>{errors.title.message}</ErrorMessage>
                      )} */}
                      <PrimarySelect {...register('category-one')}>
                        {categories.map((category) => {
                          return <option>{category}</option>
                        })}
                      </PrimarySelect>
                      <PrimarySelect {...register('category-two')}>
                        {categories.map((category) => {
                          return <option>{category}</option>
                        })}
                      </PrimarySelect>
                      <PrimarySelect {...register('category-three')}>
                        {categories.map((category) => {
                          return <option>{category}</option>
                        })}
                      </PrimarySelect>
                    </ThreeToSixColumn>

                    <FourToSixColumn>
                      <Label htmlFor='country'>URL</Label>

                      <PrimaryInput
                        {...register('url', {
                          required:
                            'This is a required field, please fill it out',
                          pattern:
                            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                        })}
                      />
                      {errors.url && (
                        <ErrorMessage>{errors.url.message}</ErrorMessage>
                      )}
                    </FourToSixColumn>

                    <SixColumn>
                      <Label htmlFor='street-address'>
                        Opportunity Description
                      </Label>

                      <PrimaryInput
                        {...register('description', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors.image && (
                        <ErrorMessage>{errors.image.message}</ErrorMessage>
                      )}
                    </SixColumn>

                    <SixColumn>
                      <Label htmlFor='street-address'>Opportunity Image</Label>

                      <PrimaryInput
                        {...register('image', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors.image && (
                        <ErrorMessage>{errors.image.message}</ErrorMessage>
                      )}
                    </SixColumn>

                    <SixToSixToTwoColumn>
                      <Label htmlFor='city'>Location</Label>

                      <PrimaryInput
                        {...register('location', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors.location && (
                        <ErrorMessage>{errors.location.message}</ErrorMessage>
                      )}
                    </SixToSixToTwoColumn>

                    <SixToThreeToTwoColumn>
                      <Label htmlFor='state'>Duration</Label>

                      <PrimaryInput
                        {...register('duration', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors.duration && (
                        <ErrorMessage>{errors.duration.message}</ErrorMessage>
                      )}
                    </SixToThreeToTwoColumn>

                    <SixToThreeToTwoColumn>
                      <Label htmlFor='postal-code'>Type</Label>

                      <PrimaryInput
                        {...register('type', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors.type && (
                        <ErrorMessage>{errors['type'].message}</ErrorMessage>
                      )}
                      {errors.type ? console.log(errors) : console.log(errors)}
                    </SixToThreeToTwoColumn>
                  </SixColGrid>
                </PrimaryFormContainer>
              </SectionShadow>
            </DoubleColumn>
          </ColumnLayout>
        </SectionContainer>
        {/* End of form section one */}

        <HiddenBlock>
          <YPadding>
            <TopBorder />
          </YPadding>
        </HiddenBlock>

        {/* Form section two */}
        <SectionContainer>
          <ColumnLayout>
            <SingleColumn>
              <PrimaryInformationContainer>
                <PrimaryText>Description Card One</PrimaryText>
                <SecondaryText>
                  The following description cards are used to portray
                  information about the opportunity to users. There are three
                  description cards in total, giving you enough space to provide
                  detail, but keeping it short enough to remain engaging.
                </SecondaryText>
              </PrimaryInformationContainer>
            </SingleColumn>
            <DoubleColumn>
              <SectionShadow>
                <PrimaryFormContainer>
                  <SixColGrid>
                    <ThreeToSixColumn>
                      <Label htmlFor='first-name'>Card title</Label>

                      <PrimaryInput
                        {...register('description-card-one-title', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-one-title'] && (
                        <ErrorMessage>
                          {errors['description-card-one-title'].message}
                        </ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <ThreeToSixColumn>
                      <Label htmlFor='last-name'>Card subtitle</Label>

                      <PrimaryInput
                        {...register('description-card-one-subtitle', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-one-subtitle'] && (
                        <ErrorMessage>
                          {errors['description-card-one-subtitle'].message}
                        </ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <FourToSixColumn>
                      <Label htmlFor='country'>Card URL</Label>
                      <PrimaryInput
                        {...register('description-card-one-url', {
                          required:
                            'This is a required field, please fill it out',
                          pattern:
                            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                        })}
                      />
                      {errors['description-card-one-url'] && (
                        <ErrorMessage>
                          {errors['description-card-one-url'].message}
                        </ErrorMessage>
                      )}
                    </FourToSixColumn>

                    <SixColumn>
                      <Label htmlFor='street-address'>Card Image</Label>

                      <PrimaryInput
                        {...register('description-card-one-image', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-one-image'] && (
                        <ErrorMessage>
                          {errors['description-card-one-image'].message}
                        </ErrorMessage>
                      )}
                    </SixColumn>

                    <SixColumn>
                      <Label>Card description</Label>
                      <PrimaryTextArea
                        {...register('description-card-one-description', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-one-description'] && (
                        <ErrorMessage>
                          {errors['description-card-one-description'].message}
                        </ErrorMessage>
                      )}
                    </SixColumn>
                    <SixColumn>
                      <FeaturesInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Title (1)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-one-feature-one-title',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors['description-card-one-feature-one-title'] && (
                            <ErrorMessage>
                              {
                                errors['description-card-one-feature-one-title']
                                  .message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (1)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-one-feature-one-description',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-one-feature-one-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-one-feature-one-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <Separator />
                        <FeatureInputContainer>
                          <Label>Feature Title (2)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-one-feature-two-title'
                            )}
                          />
                          {errors['description-card-one-feature-two-title'] && (
                            <ErrorMessage>
                              {
                                errors['description-card-one-feature-two-title']
                                  .message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (2)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-one-feature-two-description',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-one-feature-two-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-one-feature-two-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <Separator />
                        <FeatureInputContainer>
                          <Label>Feature Title (3)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-one-feature-three-title',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-one-feature-three-title'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-one-feature-three-title'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (3)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-one-feature-three-description',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-one-feature-three-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-one-feature-three-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                      </FeaturesInputContainer>
                    </SixColumn>
                  </SixColGrid>
                </PrimaryFormContainer>

                <FormFooterContainer />
              </SectionShadow>
            </DoubleColumn>
          </ColumnLayout>
        </SectionContainer>
        {/* End of form section two */}

        <HiddenBlock>
          <YPadding>
            <TopBorder />
          </YPadding>
        </HiddenBlock>

        {/* Form section three */}
        <SectionContainer>
          <ColumnLayout>
            <SingleColumn>
              <PrimaryInformationContainer>
                <PrimaryText>Description Card Two</PrimaryText>
                <SecondaryText>The second description card</SecondaryText>
              </PrimaryInformationContainer>
            </SingleColumn>
            <DoubleColumn>
              <SectionShadow>
                <PrimaryFormContainer>
                  <SixColGrid>
                    <ThreeToSixColumn>
                      <Label htmlFor='first-name'>Card title</Label>

                      <PrimaryInput
                        {...register('description-card-two-title', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-two-title'] && (
                        <ErrorMessage>
                          {errors['description-card-two-title'].message}
                        </ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <ThreeToSixColumn>
                      <Label htmlFor='last-name'>Card subtitle</Label>

                      <PrimaryInput
                        {...register('description-card-two-subtitle', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-two-subtitle'] && (
                        <ErrorMessage>
                          {errors['description-card-two-subtitle'].message}
                        </ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <FourToSixColumn>
                      <Label htmlFor='country'>Card URL</Label>
                      <PrimaryInput
                        {...register('description-card-two-url', {
                          required:
                            'This is a required field, please fill it out',
                          pattern:
                            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                        })}
                      />
                      {errors['description-card-two-url'] && (
                        <ErrorMessage>
                          {errors['description-card-two-url'].message}
                        </ErrorMessage>
                      )}
                    </FourToSixColumn>

                    <SixColumn>
                      <Label htmlFor='street-address'>Card Image</Label>

                      <PrimaryInput
                        {...register('description-card-two-image', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-two-image'] && (
                        <ErrorMessage>
                          {errors['description-card-two-image'].message}
                        </ErrorMessage>
                      )}
                    </SixColumn>

                    <SixColumn>
                      <Label>Card description</Label>
                      <PrimaryTextArea
                        {...register('description-card-two-description', {
                          required:
                            'This is a required field, please fill it out',
                        })}
                      />
                      {errors['description-card-two-description'] && (
                        <ErrorMessage>
                          {errors['description-card-two-description'].message}
                        </ErrorMessage>
                      )}
                    </SixColumn>
                    <SixColumn>
                      <FeaturesInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Title (1)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-two-feature-one-title',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors['description-card-two-feature-one-title'] && (
                            <ErrorMessage>
                              {
                                errors['description-card-two-feature-one-title']
                                  .message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (1)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-two-feature-one-description',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-two-feature-one-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-two-feature-one-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <Separator />
                        <FeatureInputContainer>
                          <Label>Feature Title (2)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-two-feature-two-title',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors['description-card-two-feature-two-title'] && (
                            <ErrorMessage>
                              {
                                errors['description-card-two-feature-two-title']
                                  .message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (2)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-two-feature-two-description',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-two-feature-two-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-two-feature-two-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <Separator />
                        <FeatureInputContainer>
                          <Label>Feature Title (3)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-two-feature-three-title',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-two-feature-three-title'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-two-feature-three-title'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (3)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-two-feature-three-description',
                              {
                                required:
                                  'This is a required field, please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-two-feature-three-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-two-feature-three-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                      </FeaturesInputContainer>
                    </SixColumn>
                  </SixColGrid>
                </PrimaryFormContainer>

                <FormFooterContainer />
              </SectionShadow>
            </DoubleColumn>
          </ColumnLayout>
        </SectionContainer>
        {/* End of form section two */}

        <HiddenBlock>
          <YPadding>
            <TopBorder />
          </YPadding>
        </HiddenBlock>

        {/* Form section three */}
        <SectionContainer>
          <ColumnLayout>
            <SingleColumn>
              <PrimaryInformationContainer>
                <PrimaryText>Description Card Three</PrimaryText>
                <SecondaryText>
                  The third, and final, description card
                </SecondaryText>
              </PrimaryInformationContainer>
            </SingleColumn>
            <DoubleColumn>
              <SectionShadow>
                <PrimaryFormContainer>
                  <SixColGrid>
                    <ThreeToSixColumn>
                      <Label htmlFor='first-name'>Card title</Label>

                      <PrimaryInput
                        {...register('description-card-three-title', {
                          required:
                            'This is a required field please fill it out',
                        })}
                      />
                      {errors['description-card-three-title'] && (
                        <ErrorMessage>
                          {errors['description-card-three-title'].message}
                        </ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <ThreeToSixColumn>
                      <Label htmlFor='last-name'>Card subtitle</Label>

                      <PrimaryInput
                        {...register('description-card-three-subtitle', {
                          required:
                            'This is a required field please fill it out',
                        })}
                      />
                      {errors['description-card-three-subtitle'] && (
                        <ErrorMessage>
                          {errors['description-card-three-subtitle'].message}
                        </ErrorMessage>
                      )}
                    </ThreeToSixColumn>

                    <FourToSixColumn>
                      <Label htmlFor='country'>Card URL</Label>
                      <PrimaryInput
                        {...register('description-card-three-url', {
                          required:
                            'This is a required field please fill it out',
                          pattern:
                            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                        })}
                      />
                      {errors['description-card-three-url'] && (
                        <ErrorMessage>
                          {errors['description-card-three-url'].message}
                        </ErrorMessage>
                      )}
                    </FourToSixColumn>

                    <SixColumn>
                      <Label htmlFor='street-address'>Card Image</Label>

                      <PrimaryInput
                        {...register('description-card-three-image', {
                          required:
                            'This is a required field please fill it out',
                        })}
                      />
                      {errors['description-card-three-image'] && (
                        <ErrorMessage>
                          {errors['description-card-three-image'].message}
                        </ErrorMessage>
                      )}
                    </SixColumn>

                    <SixColumn>
                      <Label>Card description</Label>
                      <PrimaryTextArea
                        {...register('description-card-three-description', {
                          required:
                            'This is a required field please fill it out',
                        })}
                      />
                      {errors['description-card-three-description'] && (
                        <ErrorMessage>
                          {errors['description-card-three-description'].message}
                        </ErrorMessage>
                      )}
                    </SixColumn>

                    <SixColumn>
                      <FeaturesInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Title (1)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-three-feature-one-title',
                              {
                                required:
                                  'This is a required field please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-three-feature-one-title'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-three-feature-one-title'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (1)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-three-feature-one-description',
                              {
                                required:
                                  'This is a required field please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-three-feature-one-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-three-feature-one-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <Separator />

                        <FeatureInputContainer>
                          <Label>Feature Title (2)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-three-feature-two-title',
                              {
                                required:
                                  'This is a required field please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-three-feature-two-title'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-three-feature-two-title'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (2)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-three-feature-two-description',
                              {
                                required:
                                  'This is a required field please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-three-feature-two-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-three-feature-two-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <Separator />
                        <FeatureInputContainer>
                          <Label>Feature Title (3)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-three-feature-three-title',
                              {
                                required:
                                  'This is a required field please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-three-feature-three-title'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-three-feature-three-title'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                        <FeatureInputContainer>
                          <Label>Feature Description (3)</Label>
                          <PrimaryInput
                            {...register(
                              'description-card-three-feature-three-description',
                              {
                                required:
                                  'This is a required field please fill it out',
                              }
                            )}
                          />
                          {errors[
                            'description-card-three-feature-three-description'
                          ] && (
                            <ErrorMessage>
                              {
                                errors[
                                  'description-card-three-feature-three-description'
                                ].message
                              }
                            </ErrorMessage>
                          )}
                        </FeatureInputContainer>
                      </FeaturesInputContainer>
                    </SixColumn>
                  </SixColGrid>
                </PrimaryFormContainer>

                <FormFooterContainer />
              </SectionShadow>
            </DoubleColumn>
          </ColumnLayout>
        </SectionContainer>

        {/* End of form section three */}
        <FormFooterContainer>
          <SubmitButton type='submit' value='submit' />
        </FormFooterContainer>
      </PrimaryContainer>
    </>
  )
}

export default OpportunitySubmissionForm
