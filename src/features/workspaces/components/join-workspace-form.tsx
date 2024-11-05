'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useJoinWorkspace } from '../api/use-join-workspace';
import { useInviteCode } from '../hooks/use-invite-code';
import { useWorkspaceId } from '../hooks/use-workspace-id';

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: {
          workspaceId,
        },
        json: {
          code: inviteCode,
        },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>{' '}
          workspace.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
          <Button
            variant={'secondary'}
            type="button"
            className="w-full lg:w-fit"
            asChild
            size={'lg'}
          >
            <Link href={'/'}>Cancel</Link>
          </Button>
          <Button
            size={'lg'}
            className="w-full lg:w-fit"
            type="button"
            disabled={isPending}
            onClick={onSubmit}
          >
            Join workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
