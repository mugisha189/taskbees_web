interface EventData extends calendarEvent {
  id: number;
  title: string;
  location?: string;
  date?: string;
  start: string;
  end: string;
  description?: string;
}

interface ViewModalProps {
  eventData: EventData;               
  closeModal: () => void;             
  onEditEvent: () => void;                 
  onDeleteEvent: () => void;               
  onShareEvent: () => void;                
}

interface EditModalProps {
  eventData: EventData;               
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
  closeModal: () => void;            
}

interface DeleteModalProps {
  eventData: EventData;               
  
  handleSubmit: () => void; 
  closeModal: () => void;            
}

interface CreateModalProps {
  eventData: EventData;               
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
  closeModal: () => void;            
}