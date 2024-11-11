import { redirect } from 'next/navigation';

import { WorkspaceIdJoinClient } from './client';

import { getCurrent } from '@/features/auth/queries';

const WorkspaceIdJoinPage = async () => {
  const current = await getCurrent();
  if (!current) redirect('/sign-in');
  return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
