import 'react-big-calendar/lib/css/react-big-calendar.css';
import './data-calendar.css';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import { Task } from '../type';
import { EventCard } from './event-card';

import { Button } from '@/components/ui/button';

const locales = {
  vi: vi,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface DataCalendarProps {
  data: Task[];
}

interface CustomToolbarProps {
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
  date: Date;
}
const CustomToolbar = ({ onNavigate, date }: CustomToolbarProps) => {
  return (
    <div className="bg-4 flex w-full items-center justify-center gap-x-2 lg:w-auto lg:justify-start">
      <Button
        onClick={() => onNavigate('PREV')}
        variant="secondary"
        size="icon"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div className="border-input flex h-8 w-full items-center rounded-md border px-3 py-2  lg:w-auto">
        <CalendarIcon className="mr-2 size-4" />
        <p className="text-sm">{format(date, 'MMMM yyyy')}</p>
      </div>
      <Button
        onClick={() => onNavigate('NEXT')}
        variant="secondary"
        size="icon"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};

export const DataCalendar = ({ data }: DataCalendarProps) => {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );

  const events = data.map((task) => ({
    title: task.name,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    project: task.project,
    assignee: task.assignee,
    status: task.status,
    id: task.$id,
  }));

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    if (action === 'PREV') {
      setValue(subMonths(value, 1));
    } else if (action === 'NEXT') {
      setValue(addMonths(value, 1));
    } else if (action === 'TODAY') {
      setValue(new Date());
    }
  };
  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={['month']}
      defaultView="month"
      toolbar
      showAllEvents
      className="w-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, 'EEEE', culture) ?? '',
      }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignee={event.assignee}
            project={event.project}
            status={event.status}
          />
        ),
        toolbar: () => (
          <CustomToolbar onNavigate={handleNavigate} date={value} />
        ),
      }}
    />
  );
};
