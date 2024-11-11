'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { PageError } from '@/components/page-error';
import { PageLoader } from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { useGetProject } from '@/features/projects/api/use-get-project';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useProjectId } from '@/features/projects/hooks/use-project-id';
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher';

export const ProjectIdClient = () => {
  const projectId = useProjectId();
  const { data: project, isLoading: projectsLoading } = useGetProject({
    projectId,
  });
  //   const { data: analytics, isLoading: analyticsLoading } =
  //     useGetProjectAnalytics({ projectId });

  const isLoading = projectsLoading;
  if (isLoading) return <PageLoader />;
  if (!project) return <PageError message="Project not found" />;

  const href = `/workspaces/${project.workspaceId}/projects/${project.$id}/settings`;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button variant={'secondary'} size={'sm'} asChild>
            <Link href={href}>
              <PencilIcon className="mr-2 size-4" />
              Edit project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
};
