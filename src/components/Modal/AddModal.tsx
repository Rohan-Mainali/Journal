import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import CardProps from '../../types/CardProps'
import axios from 'axios'
import * as Yup from 'yup'

interface ModalProps {
    isOpen: boolean
    changeModalState: () => void
}

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Signed up successfully.',
        type: 'success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const formValidationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter journal title'),
    body: Yup.string().required('Please enter journal body'),
})

export default function MyModal({ isOpen, changeModalState }: ModalProps) {
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const createNewJournal = async (data: CardProps, resetForm: () => void) => {
        try {
            const obj = data
            obj.date = new Date()
            const response = await axios.post(
                'http://localhost:3001/api/v1/journal',
                obj
            )
            console.log(response)
            if (data) {
                resetForm({})
            }
        } catch (error) {
            console.log(error)
        } finally {
            changeModalState()
        }
    }
    return (
        <>
            {' '}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={changeModalState}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add Journal
                                    </Dialog.Title>
                                    <div className="mt-2 felx flex-col">
                                        <Formik
                                            initialValues={{
                                                title: '',
                                                body: '',
                                                date: '',
                                            }}
                                            onSubmit={(
                                                values: CardProps,
                                                actions
                                            ) => {
                                                createNewJournal(
                                                    values,
                                                    actions.resetForm
                                                )
                                            }}
                                            validationSchema={
                                                formValidationSchema
                                            }
                                        >
                                            {(
                                                props: FormikProps<ISignUpForm>
                                            ) => {
                                                const {
                                                    values,
                                                    touched,
                                                    errors,
                                                    handleBlur,
                                                    handleChange,
                                                    isSubmitting,
                                                } = props
                                                return (
                                                    <Form className="flex flex-col gap-x-2">
                                                        <input
                                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-0 focus:border-gray-500 block w-full p-2.5"
                                                            name="title"
                                                            id="titel"
                                                            value={values.title}
                                                            type="text"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                        ></input>
                                                        {touched.title &&
                                                            errors.title && (
                                                                <div className="text-red-500 text-sm py-2 text-left">
                                                                    {
                                                                        errors.title
                                                                    }
                                                                </div>
                                                            )}
                                                        <input
                                                            className=" mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-0 focus:border-gray-500 block w-full p-2.5"
                                                            name="body"
                                                            id="body"
                                                            value={values.body}
                                                            type="text"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            onBlur={handleBlur}
                                                        ></input>
                                                        {touched.body &&
                                                            errors.body && (
                                                                <div className="text-red-500 text-sm py-2 text-left">
                                                                    {
                                                                        errors.body
                                                                    }
                                                                </div>
                                                            )}
                                                        <button
                                                            className="mt-3 p-2 bg-indigo-800 text-white "
                                                            type="submit"
                                                            variant="contained"
                                                            color="secondary"
                                                        >
                                                            Submit
                                                        </button>
                                                    </Form>
                                                )
                                            }}
                                        </Formik>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
