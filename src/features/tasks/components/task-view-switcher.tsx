'use client';

import { Loader, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { useGetTasks } from '../api/use-get-tasks';
import { useCreateTaskModal } from '../hooks/use-create-task-modal';
import { useTaskFilters } from '../hooks/use-task-filters';
import { columns } from './columns';
import { DataFilters } from './data-filter';
import { DataTable } from './data-table';

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';

export const TaskViewSwitcher = () => {
  const [{ projectId, status, assigneeId, search, dueDate }] = useTaskFilters();

  const [view, setView] = useQueryState('task-view', {
    defaultValue: 'table',
  });

  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    status,
    assigneeId,
    search,
    dueDate,
  });

  const { open } = useCreateTaskModal();

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size={'sm'} className="w-full lg:w-auto">
            <PlusIcon className="mr-2 size-4" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <Loader className="text-muted-foreground size-5 animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              Kanba
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Calendar
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
