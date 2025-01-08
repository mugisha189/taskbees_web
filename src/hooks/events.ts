
import { createEvent, getEventById, getEvents, updateEvent } from "@/api/events";
import { Event } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => {
      
      return getEvents();
    },
  });
};

export const useGetEventById = (id:string|undefined) => {
  return useQuery({
    queryKey: ['event', id], 
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey; 
      return getEventById(id); 
    },
  });
};

export const useCreateEvent = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (data: Event) => {
      return createEvent(data);
    },
    onSuccess: (data) => {
      toast.success("Event created successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      return data;

    },
    onError: (error: any) => {
      console.log(error)
      
      toast.error("Error creating event")
      console.error(
        "Error creating event:",
        error instanceof Error ? error.message : error
      );
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (data: Event) => {
      return updateEvent(data.id, data);
    },
    onSuccess: () => {
      toast.success("Event updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: any) => {
      console.log(error)
      toast.error("Error updating event")
      console.error(
        "Error updating event:",
        error instanceof Error ? error.message : error
      );
    },
  })
}