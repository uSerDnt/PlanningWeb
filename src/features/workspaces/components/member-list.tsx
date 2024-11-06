'use client';

import { Fragment } from 'react';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ArrowLeftIcon, MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';

import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteMember } from '@/features/members/api/use-delete-member';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useUpdateMember } from '@/features/members/api/use-update-member';
import { MemberAvatar } from '@/features/members/components/member-avatar';
import { MemberRole } from '@/features/members/type';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/hooks/use-confirm';

export const MemberList = () => {
  const workspaceId = useWorkspaceId();
  const { toast } = useToast();
  const [ConfirmDialog, confirm] = useConfirm(
    'Remove member',
    'This member will be removed from the workspace',
    'destructive'
  );
  const { data } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          toast({ description: 'Member removed successfully' });
        },
      }
    );
  };

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId },
    });
  };

  return (
    <Card className="size-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
        <Button asChild size={'sm'} variant={'secondary'}>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold"></CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-muted-foreground text-xs font-medium">
                  {member.email}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="ml-auto"
                    variant={'secondary'}
                    size={'icon'}
                  >
                    <MoreVerticalIcon className="text-muted-foreground size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.ADMIN)
                    }
                    disabled={isUpdatingMember}
                  >
                    Set as Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.MEMBER)
                    }
                    disabled={isUpdatingMember}
                  >
                    Set as Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700"
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={isDeletingMember}
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <div className="mt-6">
                <Separator className="my-2.5" />
              </div>
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
