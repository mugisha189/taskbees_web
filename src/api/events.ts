import { AxiosError } from "axios";
import { PROTECTED_API } from "./axios";
import { Event } from "@/types/api";

export const getEvents = async () => {
  try {
    const response = await PROTECTED_API.get(`/users/events/all`);
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error fetching events:', error);
    throw error;
  }
};
export const getEventById = async (id:string|undefined) => {
  try {
    const response = await PROTECTED_API.get(`/events/events/${id}`);
    return response.data.payload.event;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (data: Event) => {
  try {
    const response = await PROTECTED_API.post(`/events/events/add`, data);
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, data: Event) => {
  try {
    const response = await PROTECTED_API.patch(`/events/events/${id}`, data);
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await PROTECTED_API.delete(`/events/events/delete/${id}`);
    return response.data.payload;
  } catch (error) {
    if(error instanceof AxiosError){
      throw new Error(error.response?.data.message)
    }
    console.error('Error deleting event:', error);
    throw error;
  }
};