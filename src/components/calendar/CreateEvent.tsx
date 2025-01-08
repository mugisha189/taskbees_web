import React from 'react';
import { IoClose } from 'react-icons/io5';
import {  Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from '../loader/Spinner';
import { Event } from '@/types/api';

interface CreateModalProps {
  eventData: {
    title: string;
    location: string;
    start: string;
    end: string;
  };
  loading: boolean;
  handleSubmit: (values: any) => void;
  closeModal: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  eventData,
  loading,
  handleSubmit,
  closeModal,
}) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    location: Yup.string().required('Location is required'),
    start: Yup.date().required('Start date is required'),
    end: Yup.date().required('End date is required'),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-30 z-50">
      <div className="bg-white md:h-fit h-[100vh] md:rounded-[20px] shadow-lg p-6 max-w-[600px] md:w-[600px] w-full">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4">Add new Event</h2>
          <button onClick={closeModal} className="">
            <IoClose />
          </button>
        </div>
        <Formik
          initialValues={eventData}
          validationSchema={validationSchema}

          onSubmit={(values) => {
            console.log(values)
            const formattedData: Event = {
              title: values.title
              ,location: values.location
              , start_date: values.start.split('T')[0]
              , end_date: values.end.split('T')[0],
              start_time: values.start.split('T')[1]
              , end_time: values.end.split('T')[1]
            }
            
            handleSubmit(formattedData);

          }}
        >
          {({ handleChange, handleBlur,values }) => (
            <Form>
              <div className="flex justify-between gap-2 md:flex-row flex-col">
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium mb-2" htmlFor="title">
                    Title
                  </label>
                  <Field
                    placeholder="Enter title"
                    type="text"
                    id="title"
                    onChange={handleChange}
                    value={values.title}
                    onBlur={handleBlur}
                    name="title"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium mb-2" htmlFor="location">
                    Location
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    onChange={handleChange}
                    value={values.location}
                    onBlur={handleBlur}
                    placeholder="Enter location"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <div className="flex justify-between md:flex-row flex-wrap flex-col gap-2">
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium mb-2" htmlFor="start">
                    Start Date
                  </label>
                  <Field
                    type="datetime-local"
                    id="start"
                    step="1" 
                    name="start"
                    onChange={handleChange}
                    value={values.start}
                    onBlur={handleBlur}
                    className="w-full border rounded px-3 py-2"
                  />
                  <ErrorMessage name="start" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium mb-2" htmlFor="end">
                    End Date
                  </label>
                  <Field
                    
                    type="datetime-local"
                    id="end"
                    step="1" 
                    onChange={handleChange}
                    value={values.end}
                    onBlur={handleBlur}
                    name="end"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ErrorMessage name="end" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 flex-1 bg-brand-500 text-white rounded-[10px] transition-all h-[50px] hover:scale-[1.02] hover:bg-brand-blue-600"
                >
                  {loading ? <div className="flex w-full justify-center items-center">
                    <Spinner />
                    

                  </div> : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateModal;