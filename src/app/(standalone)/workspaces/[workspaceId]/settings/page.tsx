import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/actions';

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect('/sign-in');

  return (
    <div>
      <h1>Workspace Settings {params.workspaceId}</h1>
    </div>
  );
};
export default WorkspaceIdSettingsPage;
